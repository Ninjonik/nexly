"use client"

import React, {useState} from "react";

export const SwipeHandler = ({ children, setWidth }: { children: React.ReactNode, setWidth: (value: string) => void }) => {

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const [sidebarWidth, setSidebarWidth] = useState<string>('full')

    const minSwipeDistance = 50

    const onTouchStart = (e: any) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
        console.log("touch start")
    }

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')

        if(isLeftSwipe) setSidebarWidth('0')
        if(isRightSwipe) setSidebarWidth('full')
    }
    return (
        <>
            <div className='absolute w-[100dvw] h-[100dvh]  ' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}></div>
            {children}
        </>
    );
};