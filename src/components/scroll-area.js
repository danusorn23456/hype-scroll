import React, { useCallback, useEffect, useRef } from 'react'

function ScrollArea({ as, width = '100%', activeOpacity = 1, inactiveOpacity = 0.1, height = "100%", trackSize = 14, thumbColor = "white", trackColor = "dimgray", style, scrollX, scrollY = true, autoHideDuration = 1000, children, className, ...arg }) {

    //set up some presu-do css without touching your own .css file
    let prefix = "hype-scollbar"
    let styleSheet = document.getElementById(prefix);
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = prefix;
        styleSheet.innerHTML = `.${prefix}_remove-scroll-bar::-webkit-scrollbar {
            display: none;
        }
        .${prefix}_remove-scroll-bar{
            -ms-overflow-style: none; 
            scrollbar-width: none;
        }
        .${prefix}_scroll-track:hover{
            opacity:${activeOpacity} !important;
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

    const mouseRef = useRef({
        mouseDown: false,
        scrollBarPosition: ""
    })
    const scrollArea = useRef({});
    const scrollHost = useRef({});
    const scrollBar = useRef({});

    const stopScrollTimer = useRef(null);

    //default inline style without any calculate logic
    const inlineStyle = {
        area: {
            boxSizing: "border-box",
            height: height,
            width: width,
            transform: 'translateZ(0)',
            overflowX: scrollX ? 'auto' : 'hidden',
            overflowY: scrollY ? 'auto' : 'hidden',
            ...style
        },
        host: {
            boxSizing: "border-box",
            transitionDuration: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            willChange: 'transform',
            overflow: 'hidden',
            zIndex: 999999,
        },
        track: {
            boxSizing: "border-box",
            opacity: inactiveOpacity,
            transformOrigin: 'center',
            background: trackColor,
            pointerEvents: 'auto',
            transition: 'opacity 300ms',
            borderRadius: 'circle',
        },
        button: {
            boxSizing: "border-box",
            cusor: "pointer",
            transition: 'transform 50ms',
            willChange: 'transform',
            background: thumbColor,
            outline: 'none',
            borderStyle: 'none',
            borderRadius: trackSize,
        }
    }

    const animate = useCallback(() => {
        let area = scrollArea.current;
        if (!area) return;

        area.scrollTopLimit = area.scrollHeight - area.clientHeight;
        area.scrollLeftLimit = area.scrollWidth - area.clientWidth;
        area.isOverflowY = scrollY && area.scrollHeight - area.clientHeight > 1;
        area.isOverflowX = scrollX && area.scrollWidth - area.clientWidth > 1;

        let rightScrollBar = scrollBar.current.right;
        let bottomScrollBar = scrollBar.current.bottom;

        let track;
        let button;

        let host = scrollHost.current;
        area.style.zIndex = window.getComputedStyle(area).getPropertyValue('position') === "fixed" ? 1 : 0;

        host.style.transform = `translate(${area.scrollLeft}px,${area.scrollTop}px)`
        host.style.width = area.clientWidth + 'px';
        host.style.height = area.clientHeight + 'px';

        if (rightScrollBar) {
            track = rightScrollBar;
            button = rightScrollBar.children[0];

            track.style.width = trackSize + 'px';
            track.style.height = area.isOverflowX ? area.clientHeight - trackSize + 'px' : area.clientHeight + 'px';
            track.style.display = area.isOverflowY ? 'flex' : 'none';
            track.style.padding = `0 ${Math.floor(variant.buttonMargin)}px`;
            track.style.marginLeft = 'auto';

            button.style.width = '100%';
            button.style.height = area.clientHeight < 60 ? area.clientHeight * (area.clientHeight / area.scrollHeight) : Math.max(area.clientHeight * (area.clientHeight / area.scrollHeight), 50) + 'px';
            button.style.transform = `scaleY(0.${Math.round(100 - 3.5)}) translateY(${(area.scrollTop) * ((track.offsetHeight - button.offsetHeight) / area.scrollTopLimit) + variant.buttonMargin / 2}px)`
        }

        if (bottomScrollBar) {
            track = bottomScrollBar;
            button = bottomScrollBar.children[0];

            track.style.height = trackSize + 'px';
            track.style.width = area.isOverflowY ? area.clientWidth - trackSize + 'px' : area.clientWidth + 'px';
            track.style.display = area.isOverflowX ? 'flex' : 'none';
            track.style.padding = `${Math.floor(variant.buttonMargin)}px 0`;
            track.style.marginTop = area.isOverflowY ? 0 : area.clientHeight - trackSize + 'px';

            button.style.height = '100%';
            button.style.width = area.clientWidth < 60 ? area.clientWidth * (area.clientWidth / area.scrollWidth) : Math.max(area.clientWidth * (area.clientWidth / area.scrollWidth), 50) + 'px';
            button.style.transform = `scaleX(0.${Math.round(100 - variant.buttonMargin / 2)}) translate(${(area.scrollLeft) * ((track.offsetWidth - button.offsetWidth) / area.scrollLeftLimit) + variant.buttonMargin / 2}px)`;
        }

        if (stopScrollTimer.current) {
            window.clearTimeout(stopScrollTimer.current);
        }

        const scrollBars = Object.values(scrollBar.current)

        if (scrollBars) {
            scrollBars.forEach(bar => {
                bar.style.opacity = activeOpacity
            })
        }

        stopScrollTimer.current = window.setTimeout(() => {
            scrollBars.forEach(scroll => {
                scroll.style.opacity = inactiveOpacity
            })
        }, autoHideDuration);
    }, [scrollX, scrollY, trackSize, variant.buttonMargin, activeOpacity, autoHideDuration, inactiveOpacity])

    const handleAreaScroll = () => {
        animate()
    }

    const handleWindowMouseMove = useCallback(e => {
        let scrollBarPosition = mouseRef.current.scrollBarPosition
        let area = scrollArea.current;
        let rightScrollBar = scrollBar.current.right;
        let bottomScrollBar = scrollBar.current.bottom;

        let button;
        let track;
        const isMouseDown = mouseRef.current.mouseDown

        if (isMouseDown) {
            if (scrollY && scrollBarPosition === "right") {
                track = rightScrollBar;
                button = rightScrollBar.children[0];
                scrollArea.current.scrollTop = ((e.clientY - area.getBoundingClientRect().top) - (button.offsetHeight / 2)) * (area.scrollTopLimit / (track.offsetHeight - button.offsetHeight));
            }
            if (scrollX && scrollBarPosition === "bottom") {
                track = bottomScrollBar;
                button = bottomScrollBar.children[0];
                scrollArea.current.scrollLeft = ((e.clientX - area.getBoundingClientRect().left) - (button.offsetWidth / 2)) * (area.scrollLeftLimit / (track.offsetWidth - button.offsetWidth));
            }
        }
    }, [scrollX, scrollY]);

    const handleWindowMouseUp = () => {
        mouseRef.current = {
            ...mouseRef.current,
            mouseDown: false
        }
    }

    const handleTrackMouseDown = (scrollBarPosition) => {
        mouseRef.current = {
            ...mouseRef.current,
            scrollBarPosition,
            mouseDown: true
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
        animate()
        console.log("render")
        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.clearTimeout(stopScrollTimer.current);
        }
    }, [handleWindowMouseMove, animate])

    return (
        <TAG ref={scrollArea} style={inlineStyle.area} onScroll={handleAreaScroll} className={`${prefix}_remove-scroll-bar ${className}`} {...arg}>
            {children}
            <div className={`${prefix}_scroll-host`} ref={scrollHost} style={inlineStyle.host}>
                {scrollY && (
                    <div data-scroll-bar={"right"} className={`${prefix}_scroll-track`} ref={ref => scrollBar.current.right = ref} onMouseDown={e => handleTrackMouseDown("right")} style={inlineStyle.track}>
                        <button style={inlineStyle.button}></button>
                    </div>)
                }
                {scrollX && (
                    <div data-scroll-bar={"bottom"} className={`${prefix}_scroll-track`} ref={ref => scrollBar.current.bottom = ref} onMouseDown={e => handleTrackMouseDown("bottom")} style={inlineStyle.track}>
                        <button style={inlineStyle.button}></button>
                    </div>)
                }
            </div>
        </TAG>
    )
}

export { ScrollArea }

