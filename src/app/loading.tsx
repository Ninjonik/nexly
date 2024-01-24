"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = () => {

    const texts = [
        "Tip: Don't forget to drink water. Your plants can't have all the fun.",
        "Tip: Remember to stand up and stretch. Your chair needs a break too.",
        "Tip: Save your work often. The 'ctrl + s' fairy appreciates your dedication.",
        "Tip: Take a break. Your screen is tired of looking at you.",
        "Tip: Don't trust atoms. They make up everything.",
        "Tip: If at first you don't succeed, call it version 1.0.",
        "Tip: Life is short. Smile while you still have teeth.",
        "Tip: If you think nobody cares if you're alive, try missing a couple of payments.",
        "Tip: Always borrow money from a pessimist. They'll never expect it back.",
        "Tip: If you're not supposed to eat at night, why is there a light in the fridge?",
        "Tip: If you're stuck in a hole, stop digging.",
        "Tip: The best way to predict the future is to invent it.",
        "Tip: The only thing standing between you and success is the word 'try'.",
        "Tip: If you want to live a happy life, tie it to a dog's tail.",
        "Tip: Never tell people how to do things. Tell them what to do and they will surprise you with their ingenuity.",
        "Tip: The only place where success comes before work is in the dictionary.",
        "Tip: Don't wait for the perfect moment. Take the moment and make it perfect.",
        "Tip: It's not what you look at that matters, it's what you see.",
        "Tip: The world is a book and those who do not travel read only one page.",
        "Tip: The only thing worse than being blind is having sight but no vision.",
        "Tip: The only limit to our realization of tomorrow will be our doubts of today.",
        "Tip: You can observe a lot just by watching.",
        "Tip: The only thing we have to fear is fear itself.",
        "Tip: The best revenge is massive success.",
        "Tip: Never mistake activity for achievement.",
        "Tip: The only thing we have to fear is fear itself.",
        "Tip: The only thing worse than being blind is having sight but no vision.",
        "Tip: The best revenge is massive success.",
        "Tip: Never mistake activity for achievement.",
        "Tip: The only thing we have to fear is fear itself.",
        "Tip: The only thing worse than being blind is having sight but no vision.",
        "Tip: The best revenge is massive success.",
        "Tip: Never mistake activity for achievement.",
        "Tip: The only thing we have to fear is fear itself.",
        "Tip: The only thing worse than being blind is having sight but no vision.",
        "Tip: The best revenge is massive success.",
        "Tip: Never mistake activity for achievement."
    ];

    const [currentText, setCurrentText] = useState("");
    const [lastIndex, setLastIndex] = useState(-1);

    const getRandomIndex = () => {
        let index;
        do {
            index = Math.floor(Math.random() * texts.length);
        } while (index === lastIndex);
        return index;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newIndex = getRandomIndex();
            setLastIndex(newIndex);
            setCurrentText(texts[newIndex]);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [lastIndex]);

    return (

        <div role="status"
             className={'h-screen w-screen flex flex-col justify-center items-center bg-gray overflow-hidden no-scrollbar'}>
            <div className='animate-bounce'>
                <div
                    className="inline-block h-[10dvw] w-[10dvw] animate-spin rounded-full border-[2dvw] border-solid border-cyan-100 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
            </div>
            <div>{currentText}</div>
        </div>

    );
};

export default Loading;
