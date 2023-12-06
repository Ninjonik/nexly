"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = () => {
    const [isFlashing, setIsFlashing] = useState(true);

    useEffect(() => {
        const flashingInterval = setInterval(() => {
            setIsFlashing((prev) => !prev);
        }, 500);

        return () => clearInterval(flashingInterval);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className={`transition-opacity duration-500 ${isFlashing ? 'opacity-0' : 'opacity-100'}`}>
                <Image src="/logo/nexly_transparent.jpg" alt="Flashing Image" width={200} height={200} />
            </div>
        </div>
    );
};

export default Loading;
