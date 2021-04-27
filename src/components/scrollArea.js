import React, {  useCallback, useEffect, useRef, useState } from 'react'


export default function ScrollArea({ as, width = '100%', height = "100%", trackSize = 16, thumbColor = "#242526", trackColor = "#E4E6EB", style, scrollX, scrollY = true, children, className, ...arg }) {

    //set up some presu-do css without touching your own .css file
    let prefix = "danusorn-custom-scollbar"
    let styleSheet = document.getElementById(prefix);
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = prefix;
        styleSheet.innerHTML = `
        .${prefix}_remove-scroll-bar::-webkit-scrollbar {
            display: none;
        }
        .${prefix}_remove-scroll-bar{
        -ms-overflow-style: none; 
        scrollbar-width: none;
        }
        .${prefix}_scroll-track:hover{
            opacity:0.6 !important;
        }
      `;
        document.head.appendChild(styleSheet);
    }

    let TAG = as || 'div'

    const variant = {
        thumbColor: thumbColor,
        trackColor: trackColor,
        trackWidth: trackSize,
        trackHeight: trackSize,
        buttonMargin: Math.round(trackSize / 4),
    }

    const [isScrolling, setIsScrolling] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const scrollArea = useRef({});
    const scrollHost = useRef({});
    const scrollBar = useRef({});

    const raf = useRef({});
    const stopScrollTimer = useRef(null);

    //default inline style without any calculate logic
    const inlineStyle = {
        area: {
            height: height,
            width: width,
            overflowX: scrollX ? 'auto' : 'hidden',
            overflowY: scrollY ? 'auto' : 'hidden',
            ...style
        },
        host: {
            transitionDuration: 0,
            position: 'fixed',
            top:0,
            left:0,
            pointerEvents: 'none',
            willChange: 'transform',
            overflow: 'hidden',
            zIndex: 999999,
        },
        track: {
            transformOrigin:'center',
            opacity: isScrolling ? 0.6 : 0,
            background: trackColor,
            pointerEvents: 'auto',
            transition: 'opacity 300ms',
        },
        button: {
            transition: 'transform 50ms',
            willChange: 'transform',
            background: thumbColor,
            outline: 'none',
            borderRadius: trackSize,
        }
    }
    const animate = () => {

        let area = scrollArea.current;
        area.scrollTopLimit = area.scrollHeight - area.clientHeight;
        area.scrollLeftLimit = area.scrollWidth - area.clientWidth;
        area.isOverflowY = scrollY && area.scrollHeight - area.clientHeight > 1;
        area.isOverflowX =  scrollX && area.scrollWidth - area.clientWidth > 1;
        area.hasTransform = window.getComputedStyle(scrollArea.current).getPropertyValue('transform') !== "none";

        let rightScrollBar = scrollBar.current.right;
        let bottomScrollBar = scrollBar.current.bottom;

        let track;
        let button;

        let host = scrollHost.current;
        area.style.zIndex = window.getComputedStyle(area).getPropertyValue('position') === "fixed" ? 1 : 0;
        host.style.transform = area.hasTransform ? `translate(${area.scrollLeft}px,${area.scrollTop}px)` : `translate(${area.getBoundingClientRect().left + area.clientLeft}px,${area.getBoundingClientRect().top + area.clientTop}px)`;
        host.style.width = area.clientWidth + 'px';
        host.style.height = area.clientHeight + 'px';

        if (rightScrollBar) {
            track = rightScrollBar;
            button = rightScrollBar.children[0];

            track.style.width = trackSize + 'px';
            track.style.height = area.isOverflowX ? area.clientHeight - trackSize+'px' : area.clientHeight+'px';
            track.style.display = area.isOverflowY ? 'flex' : 'none';
            track.style.padding = `0 ${Math.floor(variant.buttonMargin)}px`;
            track.style.marginLeft = 'auto';

            button.style.width = '100%';
            button.style.height = area.clientHeight < 60 ? area.clientHeight * (area.clientHeight / area.scrollHeight) : Math.max(area.clientHeight * (area.clientHeight / area.scrollHeight), 50)+'px';
            button.style.transform = `scaleY(0.${Math.round(100 - 3.5)}) translateY(${(area.scrollTop) * ((track.offsetHeight - button.offsetHeight) / area.scrollTopLimit) + variant.buttonMargin / 2}px)`
        }

        if (bottomScrollBar) {
            track = bottomScrollBar;
            button = bottomScrollBar.children[0];

            track.style.height = trackSize + 'px';
            track.style.width = area.isOverflowY ? area.clientWidth - trackSize+'px' : area.clientWidth+'px';
            track.style.display = area.isOverflowX ? 'flex' : 'none';
            track.style.padding = `${Math.floor(variant.buttonMargin)}px 0`;
            track.style.marginTop = area.isOverflowY ? 0 : area.clientHeight - trackSize+'px';

            button.style.height = '100%';
            button.style.width = area.clientWidth < 60 ? area.clientWidth * (area.clientWidth / area.scrollWidth) : Math.max(area.clientWidth * (area.clientWidth / area.scrollWidth), 50)+'px';
            button.style.transform = `scaleX(0.${Math.round(100 - variant.buttonMargin / 2)}) translate(${(area.scrollLeft) * ((track.offsetWidth - button.offsetWidth) / area.scrollLeftLimit) + variant.buttonMargin / 2}px)`;
        }

        raf.current = window.requestAnimationFrame(animate);
    }

    const handleAreaScroll = useCallback(() => {
        if (stopScrollTimer.current) {
            window.clearTimeout(stopScrollTimer.current);
        }
        setIsScrolling(true)
        stopScrollTimer.current = window.setTimeout(() => setIsScrolling(false), 1000);
    }, [])

    const handleWindowMouseMove = e => {
        let area = scrollArea.current;
        let rightScrollBar = scrollBar.current.right;
        let bottomScrollBar = scrollBar.current.bottom;
        
        let button;
        let track;

        if (isMouseDown) {
            if(scrollY){
                track = rightScrollBar;
                button = rightScrollBar.children[0];
                scrollArea.current.scrollTop = ((e.clientY - area.getBoundingClientRect().top) - (button.offsetHeight / 2)) * (area.scrollTopLimit / (track.offsetHeight - button.offsetHeight));
            }
            if(scrollX){
                track = bottomScrollBar;
                button = bottomScrollBar.children[0];
                scrollArea.current.scrollLeft = ((e.clientX - area.getBoundingClientRect().left) - (button.offsetWidth / 2)) * (area.scrollLeftLimit / (track.offsetWidth - button.offsetWidth));
            }
        }
    }

    const handleWindowMouseUp = () => {
        setIsMouseDown(false);
    }


    useEffect(() => {
        if (!scrollArea.current) return;

        let area = scrollArea.current;
        raf.current = window.requestAnimationFrame(animate);

        area.addEventListener('scroll', handleAreaScroll);
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
        return () => {
            area.removeEventListener('scroll', handleAreaScroll);
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.cancelAnimationFrame(raf.current);
        }

    })

    return (
        <TAG ref={scrollArea} style={inlineStyle.area} className={`${prefix}_remove-scroll-bar ${className}`} {...arg}>
            {children}
            <div className={`${prefix}_scroll-host`} ref={scrollHost} style={inlineStyle.host}>
                {scrollY && (
                    <div className={`${prefix}_scroll-track`} ref={ref => scrollBar.current.right = ref} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} style={inlineStyle.track}>
                        <button style={inlineStyle.button}></button>
                    </div>)
                }
                {scrollX && (
                    <div className={`${prefix}_scroll-track`} ref={ref => scrollBar.current.bottom = ref} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)} style={inlineStyle.track}>
                        <button style={inlineStyle.button}></button>
                    </div>)
                }
            </div>
        </TAG>
    )
}


