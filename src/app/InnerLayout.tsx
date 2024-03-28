"use client"

import React, {useEffect} from "react";
import {UserContextProvider} from "@/app/UserContext";

export function InnerLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserContextProvider>
            <div className="w-screen h-screen overflow-hidden flex flex-row">

                <main className="w-full h-screen flex flex-row">

                    {children}

                </main>
            </div>
        </UserContextProvider>
    )
}
