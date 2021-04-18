import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function ScrollArea({ debug, width, height, background, children, className, trackBackground = "white",thumbStyle = {background:"gray"}, size = "12px", ...props }) {

    const scrollAreaRef = useRef({});
    const scrollWrapperRef = useRef({});

    const [isMouseDown, setIsMouseDown] = useState("");

    const scrollBarRef = useRef({
        right: {
            el: null,
            isHover: false,
            isHidden:false,
        },
        bottom: {
            el: null,
            isHover: false,
            isHidden:false,
        },
    })

    const scrollTrackRef = useRef({
        right: {
            el: null,
        },
        bottom: {
            el: null,
        },
    });

    const scrollThumbRef = useRef({
        right: {
            el: null,
        },
        bottom: {
            el: null,
        },
    });

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    })

    // scroll bar opacity animate
    const fadeOutScrollBar = useCallback(() => {
        if (!scrollBarRef.current.right.isHover) {
            scrollBarRef.current.right.el.style.opacity = 0;
            scrollBarRef.current.bottom.el.style.padding = '0px'
        }
        if (!scrollBarRef.current.bottom.isHover) {
            scrollBarRef.current.bottom.el.style.opacity = 0;
            scrollBarRef.current.right.el.style.padding = '0px'
        }
    }, [])

    const fadeInScrollBar = useCallback(() => {
        let scrollArea = scrollAreaRef.current;
        if (scrollAreaRef.current.scrollHeight - scrollAreaRef.current.offsetHeight > 1) {
            scrollBarRef.current.right.el.style.opacity = 1;
        }
        if (scrollAreaRef.current.scrollWidth - scrollAreaRef.current.offsetWidth > 1) {
            scrollBarRef.current.bottom.el.style.opacity = 1;
        }
    }, [])


    let stopScrollingTimer;

    function overflowCheck() {
        // check overflow
        let isNotOverflowX = scrollAreaRef.current.offsetWidth - scrollAreaRef.current.scrollWidth - (scrollAreaRef.current.offsetWidth - scrollAreaRef.current.clientWidth) == 0;
        let isNotOverflowY = scrollAreaRef.current.offsetHeight - scrollAreaRef.current.scrollHeight - (scrollAreaRef.current.offsetHeight - scrollAreaRef.current.clientHeight) == 0;

        if (isNotOverflowY) {
            scrollBarRef.current.right.el.style.display = "none"
            scrollBarRef.current.right.isHidden = true;
        } else {
            scrollBarRef.current.right.el.style.display = "flex"
            scrollBarRef.current.right.isHidden = false;
        }

        if (isNotOverflowX){
            scrollBarRef.current.bottom.el.style.display = "none"
            scrollBarRef.current.bottom.isHidden = true;
        } else {
            scrollBarRef.current.bottom.el.style.display = "flex"
            scrollBarRef.current.bottom.isHidden = false;
        }

        if(!scrollBarRef.current.right.isHidden && !scrollBarRef.current.bottom.isHidden){
            scrollBarRef.current.right.el.style.paddingBottom = size;
            scrollBarRef.current.bottom.el.style.paddingRight = size;
        }else{
            scrollBarRef.current.right.el.style.paddingBottom = '0px';
            scrollBarRef.current.bottom.el.style.paddingRight = '0px';
        }
    
    }

    const handleScroll = useCallback(() => {
        overflowCheck();
        ajustSize();
        fadeInScrollBar();
        
        //if client stop scrolling 1 sec the fadeout timer will do the job
        window.clearTimeout(stopScrollingTimer);
        stopScrollingTimer = setTimeout(fadeOutScrollBar, 1000);
        
        let scrollThumb = scrollThumbRef.current;
        
        scrollWrapperRef.current.style.top = scrollAreaRef.current.scrollTop +'px';
        scrollWrapperRef.current.style.left = scrollAreaRef.current.scrollLeft +'px';

        //move scroll thumb to the point
        scrollThumb.right.el.style.transform = `translateY(${Math.round(scrollAreaRef.current.scrollTop * ((scrollTrackRef.current.right.el.clientHeight - (scrollThumbRef.current.right.el.offsetHeight)) / (scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight)))}px)`;
        scrollThumb.bottom.el.style.transform = `translateX(${Math.round(scrollAreaRef.current.scrollLeft * ((scrollTrackRef.current.bottom.el.clientWidth - (scrollThumbRef.current.bottom.el.offsetWidth)) / (scrollAreaRef.current.scrollWidth - scrollAreaRef.current.clientWidth)))}px)`;
        
    }, [stopScrollingTimer])

    // about drag the scroll thumb
    const handleMouseDown = (position) => {
        setIsMouseDown(position);
    }

    const handleMouseUp = () => {
        setIsMouseDown("")
    }

    const handleMouseMove = (e) => {
        if (isMouseDown) {
            if (isMouseDown === "right") {
                scrollAreaRef.current.scrollTop = (e.clientY - scrollAreaRef.current.getBoundingClientRect().top - (scrollThumbRef.current.right.el.offsetHeight / 2)) * ((scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight) / (scrollTrackRef.current.right.el.clientHeight - (scrollThumbRef.current.right.el.offsetHeight)))
            } else {
                scrollAreaRef.current.scrollLeft = (e.clientX - scrollAreaRef.current.getBoundingClientRect().left - (scrollThumbRef.current.bottom.el.offsetWidth / 2)) * ((scrollAreaRef.current.scrollWidth - scrollAreaRef.current.clientWidth) / (scrollTrackRef.current.bottom.el.clientWidth - (scrollThumbRef.current.bottom.el.offsetWidth)))
            }
        };
    }

    // prevent scroll thumb fade out when on hover
    const toggleIsHover = (side) => {
        scrollBarRef.current[side].isHover = !scrollBarRef.current[side].isHover;
        if (scrollBarRef.current[side].isHover) {
            scrollBarRef.current[side].el.style.opacity = 1;
        } else {
            fadeOutScrollBar();
        }
    }

    const ajustSize=()=>{
        scrollThumbRef.current.right.el.style.height = Math.max(100, scrollAreaRef.current.clientHeight - (scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight)) + 'px';
        scrollThumbRef.current.bottom.el.style.width = Math.max(100, scrollAreaRef.current.clientWidth - (scrollAreaRef.current.scrollWidth - scrollAreaRef.current.clientWidth)) + 'px';
    }

    useEffect(() => {
        if (!scrollAreaRef) return;

        overflowCheck();
        fadeOutScrollBar();

        //we need to hide scrollbar immediately for all side then delay the transition
        setTimeout(() => {
            scrollBarRef.current.right.el.style.transition = "opacity 250ms";
            scrollBarRef.current.bottom.el.style.transition = "opacity 250ms";
        }, 500)

        window.addEventListener('mousemove', handleMouseMove, true);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize',handleScroll);

    }, [])

    return (
        <div className={`remove-scroll-bar relative pointer-events-auto ${className}`} style={{ width: width, height: height, background: background, overflow: 'scroll' }} ref={scrollAreaRef} onScroll={handleScroll} onMouseMove={handleMouseMove} >
            {children}
            {/* scroll wrapper */}
            <div ref={scrollWrapperRef} className={`absolute top-0 left-0 w-full h-full ${isMouseDown ? 'pointer-events-auto' : 'pointer-events-none'}`} onMouseUp={handleMouseUp}>
                {/* right scroll-bar */}
                <div ref={ref => scrollBarRef.current.right.el = ref} onMouseEnter={() => toggleIsHover("right")} onMouseLeave={() => toggleIsHover("right")} className={`right-0 top-0 h-full absolute pointer-events-auto bt-[200px] border-b[200px] box-content`} style={{width:size, background:trackBackground }}>
                    {/* right scroll-track */}
                    <div ref={ref => scrollTrackRef.current.right.el = ref} focus="-1" onMouseDown={() => handleMouseDown("right")} onMouseUp={handleMouseUp} className="h-full w-full flex" style={{ background: trackBackground }}>
                        {/* right scroll-thumb */}
                        <button ref={ref => scrollThumbRef.current.right.el = ref} className="w-full h-[100px] rounded-full focus:outline-none"  style={thumbStyle} />
                    </div>
                </div>
                {/* bottom scroll-bar */}
                <div ref={ref => scrollBarRef.current.bottom.el = ref} onMouseEnter={() => toggleIsHover("bottom")} onMouseLeave={() => toggleIsHover("bottom")} className={`absolute left-0 bottom-0 w-full pointer-events-auto`} style={{ height:size, background:trackBackground }}>
                    {/* bottom scroll-track */}
                    <div ref={ref => scrollTrackRef.current.bottom.el = ref} focus="-1" onMouseDown={() => handleMouseDown("bottom")} onMouseUp={handleMouseUp} className="h-full w-full flex" style={{ background: trackBackground }}>
                        {/* bottom scroll-thumb */}
                        <button ref={ref => scrollThumbRef.current.bottom.el = ref} className="w-[100px] h-full rounded-full focus:outline-none" style={thumbStyle} />
                    </div>
                </div>
            </div>
        </div>
    )
}
