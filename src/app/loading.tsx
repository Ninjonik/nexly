"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = () => {
    // const [isFlashing, setIsFlashing] = useState(true);
    //
    // useEffect(() => {
    //     const flashingInterval = setInterval(() => {
    //         setIsFlashing((prev) => !prev);
    //     }, 500);
    //
    //     return () => clearInterval(flashingInterval);
    // }, []);

    return (
        // <div className="flex items-center justify-center h-screen bg-gray-200">
        //     <div className={`transition-opacity duration-500 ${isFlashing ? 'opacity-0' : 'opacity-100'}`}>
        //         <Image src="/logo/nexly_transparent.jpg" alt="Flashing Image" width={200} height={200} />
        //     </div>
        // </div>

        <div role="status" className={'h-screen w-screen flex flex-col justify-center items-center bg-lightly overflow-hidden no-scrollbar'}>
            <div
                className="absolute pacman inline-block h-[10dvw] w-[10dvw] animate-bounce rounded-full border-[5dvw] border-solid border-yellow-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
            <div className='pacman-text'>Lorem ipsum dit dolor amet sit Fragment Suspense o amets.</div>
        </div>

    );
};

export default Loading;
