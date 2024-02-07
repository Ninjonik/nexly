import React, {createContext, ReactNode, useContext, useState} from "react";
import User from "@/app/utils/interfaces/User";

interface SlideContextProps {
    children: ReactNode;
}

interface SlideContextValue {
    slide: "sidebar" | "main";
    setSlide: React.Dispatch<React.SetStateAction<"sidebar" | "main">>;
}

const SlideContext = createContext<SlideContextValue | undefined>(undefined);

export const useSlideContext = () => {
    const context = useContext(SlideContext);
    if (!context) {
        throw new Error('useSlideContext must be used within a SlideContextProvider');
    }
    return context;
};

export const SlideContextProvider = ({ children }: SlideContextProps) => {

    const [slide, setSlide] = useState<"sidebar" | "main">("sidebar");

    return (
        <SlideContext.Provider value={{ slide, setSlide }}>
            {children}
        </SlideContext.Provider>
    );
};