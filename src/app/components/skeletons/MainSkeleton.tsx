import React from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import convertTimestamp from "@/app/utils/convertTimestamp";

const MainSkeleton = () => {
    return (
        <section className="w-8/10 bg-gray h-full flex flex-col text-white">

            <header className='h-1/10 w-full bg-light flex flex-row justify-between p-4 px-8'>
                <div className='flex flex-row gap-2 w-1/2 items-center'>
                    <div className='h-12 w-12 bg-gray-300 rounded-full'></div>
                    <div className='flex flex-col justify-center'>
                        <div className='h-6 w-24 bg-gray-300 mb-1'></div>
                        <div className='h-4 w-16 bg-gray-300'></div>
                    </div>
                </div>
                <div className='flex flex-row gap-6 justify-center items-center'>
                    <div className='h-6 w-6 bg-gray-300'></div>
                    <div className='h-6 w-6 bg-gray-300'></div>
                    <div className='h-6 w-6 bg-gray-300'></div>
                    <div className='h-6 w-6 bg-gray-300'></div>
                    <div className='h-6 w-6 bg-gray-300'></div>
                </div>
            </header>

            <article className='h-9/10 w-full flex flex-row'>

                <div className='h-full w-full flex flex-col'>

                    <div className='h-9/10 w-full bg-gray-dark p-[2dvw] flex flex-col-reverse gap-[2dvw] overflow-y-scroll no-scrollbar'>
                        {/* Skeleton for messages */}
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <div className='w-8/10 flex flex-row gap-[0.5dvw] items-center animate-pulse' key={index}>
                                <div className={'w-[3dvw] h-[3dvw] relative group bg-lightly rounded-full'}></div>
                                <div className='w-9/10 flex flex-col justify-center'>
                                    <div className='flex flex-row gap-[0.5dvw] items-center'>
                                        <h4 className='font-bold text-xl h-[2dvw]'></h4>
                                    </div>
                                    <span
                                        className='w-full text-md break-words bg-gray p-2 rounded-b-lg rounded-r-lg h-[2dvw]'></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className='h-1/10 w-full bg-light p-8 flex justify-center items-center'>
                        {/* Skeleton for form input */}
                        <div className='h-8 w-8 bg-gray-300 rounded-full mr-4'></div>
                        <div className='h-8 w-64 bg-gray-300 rounded-full'></div>
                        {/* Button skeleton */}
                        <button className='invisible' disabled={true}></button>
                    </form>

                </div>

                <aside className={`h-full w-3/10 bg-light border-t-2 border-blue flex flex-col p-[2dvw] gap-[2dvw] hidden`}>
                    {/* Skeleton for group information */}
                    <div className='h-8 w-24 bg-gray-300 mb-[2dvw]'></div>
                    {/* Skeleton for description */}
                    <div className='h-2 w-16 bg-gray-300 mb-4'></div>
                    {/* Skeleton for members */}
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className='flex justify-between items-center mb-2'>
                            <div className='flex flex-row gap-[0.5dvw] items-center'>
                                <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
                                <div className='h-6 w-24 bg-gray-300'></div>
                            </div>
                            <div className='flex flex-row gap-[0.5dvw]'>
                                <div className='h-6 w-6 bg-gray-300'></div>
                                <div className='h-6 w-6 bg-gray-300'></div>
                            </div>
                        </div>
                    ))}
                </aside>

            </article>

        </section>
    );
};

export default MainSkeleton;
