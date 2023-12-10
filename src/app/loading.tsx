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

        <div role="status" className={'h-screen w-screen flex justify-center items-center'}>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

    );
};

export default Loading;
