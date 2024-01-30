"use client"

import React from "react";
import {UserContextProvider, useUserContext} from "@/app/UserContext";
import Loading from "@/app/loading";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import LoginPage from "@/app/components/pages/Login";

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
