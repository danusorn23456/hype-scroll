import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const ScrollAreaContext = createContext();

function useScrollAreaContext() {
    let context = useContext(ScrollAreaContext);
    if (!context) {
        return console.error("can't use ScrollAreaContext outside ScrollArea Component")
    }
    return context;
}

export default function ScrollArea({ debug, width = '100%', height = "100%", trackWidth = 12, thumbColor = "#242526", trackColor = "#E4E6EB", style, renderRightScrollBar = true, children, className, ...arg }) {

    //set up some presu-do css without touching your own .css file
    let styleSheet = document.getElementById("danusorn-custom-scollbar");

    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = "danusorn-custom-scollbar";
        styleSheet.innerHTML = `
        .danusorn-custom-scollbar_remove-scroll-bar::-webkit-scrollbar {
            display: none;
        }
        .danusorn-custom-scollbar_remove-scroll-bar{
        -ms-overflow-style: none; 
        scrollbar-width: none;
        }
        .danusorn-custom-scrollbar_scroll-track:hover{
            opacity:1 !important;
        }
      `;
        document.head.appendChild(styleSheet);
    }

    const variant = {
        thumbColor: thumbColor,
        trackColor: trackColor,
        trackWidth: trackWidth,
    }

    const [isScrolling, setIsScrolling] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const [bounding, setBounding] = useState({})

    const scrollArea = useRef({});

    //i just want to scope value that use for calculate some thing
    const updateBounding = () => {
        setBounding(prev => {
            let nextState = { ...prev };
            nextState.offsetHeight = scrollArea.current.offsetHeight;
            nextState.offsetWidth = scrollArea.current.offsetWidth;
            nextState.offsetLeft = scrollArea.current.offsetLeft;
            nextState.offsetTop = scrollArea.current.offsetTop;
            nextState.clientTop = scrollArea.current.clientTop;
            nextState.clientLeft = scrollArea.current.clientLeft;
            nextState.clientWidth = scrollArea.current.clientWidth;
            nextState.clientHeight = scrollArea.current.clientHeight;
            nextState.scrollHeight = scrollArea.current.scrollHeight;
            nextState.scrollTop = scrollArea.current.scrollTop;
            nextState.top = scrollArea.current.getBoundingClientRect().top;
            nextState.left = scrollArea.current.getBoundingClientRect().left;
            nextState.scrollHeightRemain = scrollArea.current.scrollHeight - scrollArea.current.clientHeight;
            nextState.trackHeight = scrollArea.current.clientHeight;
            nextState.trackDragState = scrollArea.current.getBoundingClientRect().height / 2;
            nextState.trackScrollHeightRemain = (scrollArea.current.getBoundingClientRect().height - Math.max(scrollArea.current.getBoundingClientRect().height) * (scrollArea.current.getBoundingClientRect().height / scrollArea.current.scrollHeight), 100);
            nextState.ratioHeight = scrollArea.current.clientHeight - Math.max(scrollArea.current.getBoundingClientRect().height * (scrollArea.current.getBoundingClientRect().height / scrollArea.current.scrollHeight), 100);
            nextState.realY = (e) => (e ? e.clientY - scrollArea.current.getBoundingClientRect().top : null);
            nextState.buttonHeight = Math.max(scrollArea.current.getBoundingClientRect().height * (scrollArea.current.getBoundingClientRect().height / scrollArea.current.scrollHeight), 100);
            return nextState;
        })
    }

    let stopScrollTimer;

    function handleAreaScroll() {
        if (stopScrollTimer) {
            window.clearTimeout(stopScrollTimer);
        }

        setIsScrolling(true)
        updateBounding();

        stopScrollTimer = window.setTimeout(() => setIsScrolling(false), 1000);
    }

    const handleWindowMouseUp = () => {
        setIsMouseDown(false);
    }

    const handleWindowMouseMove = useCallback((e) => {
        if (isMouseDown) {
            scrollArea.current.scrollTop = (bounding.realY(e) - (bounding.buttonHeight / 2)) * (bounding.scrollHeightRemain / (bounding.height - bounding.buttonHeight));
        }
    },[isMouseDown])

    const handleWindowResize = () =>{
        setBounding(prev => {
            let nextState = { ...prev };
            nextState.trackHeight = 0;
            return nextState;
        })
    }

    useEffect(()=>{
        setBounding(prev => {
            let nextState = { ...prev };
            nextState.limitScrollTop = scrollArea.current.scrollHeight - scrollArea.current.clientHeight;
            return nextState;
        })
    },[])

    useEffect(() => {
        if (!scrollArea) return;

        let area = scrollArea.current;

        updateBounding();

        window.addEventListener('resize', handleWindowResize);
        area.addEventListener('scroll', handleAreaScroll);
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
            area.removeEventListener('scroll', handleAreaScroll);
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
            clearTimeout(stopScrollTimer)
        }

    }, [isMouseDown])


    return (
        <ScrollAreaContext.Provider value={{ scrollArea, isScrolling, variant, bounding, isMouseDown, setIsMouseDown }}>
            <div data-scroll-container ref={scrollArea} style={{ height: height, width: width, position: 'relative', overflow: 'auto', ...style }} className={`danusorn-custom-scollbar_remove-scroll-bar ${className}`} {...arg}>
                {children}
                <ScrollHost>
                    {
                        renderRightScrollBar && <RightScrollBar />
                    }
                </ScrollHost>
            </div>
        </ScrollAreaContext.Provider>
    )
}

const ScrollHost = ({ children }) => {
    const { bounding, variant } = useScrollAreaContext();

    let scrollHostStyle = useMemo(() => ({
        display: 'grid',
        position: 'absolute',
        width: bounding.clientWidth,
        top: bounding.scrollTop,
        overflow:'visible',
        left:0,
        zIndex:9999999,
        gridTemplateColumns: `1fr ${variant.trackWidth}px`,
        gridTemplateRows: 'empty rightScroll',
        pointerEvents: 'none',
        opacity: 0.5,
    }), [variant, bounding])

    return (
        <div data-scroll-host style={scrollHostStyle}>
            {children}
        </div>
    )
}

const RightScrollBar = () => {

    const { variant, bounding, isScrolling, setIsMouseDown } = useScrollAreaContext();

    const scrollTrack = useRef({});
    const scrollButton = useRef({});

    let trackStyle = useMemo(() => ({
        marginTop:0,
        padding: '0px 2px',
        pointerEvents: 'auto',
        background: variant.trackColor,
        transition: 'opacity 200ms',
        opacity: isScrolling ? 0.6 : 0,
        height: bounding.trackHeight,
        display: bounding.scrollHeight - bounding.clientHeight < 1 ? 'none' : 'block',
        width: variant.trackWidth,
        overflow: 'hidden',
        gridArea: 'rightScroll',
    }), [isScrolling, variant, bounding])

    const buttonStyle = useMemo(() => ({
        zIndex:'999999',
        width: '100%',
        outline: 'none',
        background: variant.thumbColor,
        borderRadius: variant.trackWidth,
        height: bounding.buttonHeight,
        transform: `translateY(${bounding.scrollTop * (bounding.ratioHeight / bounding.scrollHeightRemain)}px)`,
    }), [variant, bounding])

    return (
        <div data-scroll-track ref={scrollTrack} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} style={trackStyle} className="danusorn-custom-scrollbar_scroll-track">
            <button ref={scrollButton} style={buttonStyle}></button>
        </div>
    )
}
