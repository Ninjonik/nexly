"use client"

import React, {useState} from "react";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import {SlideContextProvider} from "@/app/SlideContext";

export const SwipeHandler = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <SlideContextProvider>
                {children}
            </SlideContextProvider>
        </>
    );
};