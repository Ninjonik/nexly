"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import './globals.css'
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import {UserContextProvider, useUserContext} from "@/app/UserContext";
import Loading from "@/app/loading";
import Main from "@/app/components/pages/Main";
import LoginPage from "@/app/components/pages/Login";
import React from "react";
import Sidebar from "@/app/components/Sidebar";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import ChannelMain from "@/app/components/ChannelMain";
import FormInput from "@/app/components/form/FormInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                <UserContextProvider>
                    <InnerLayout>{children}</InnerLayout>
                </UserContextProvider>
        </body>
        </html>
    )
}

function InnerLayout({ children }: { children: React.ReactNode }) {
    const { loggedInUser, setLoggedInUser } = useUserContext();

    if (loggedInUser == "pending") {
        return <Loading />;
    }

    return loggedInUser ? (
        <div className="w-screen h-screen overflow-hidden flex flex-row">

            <main className="w-full h-screen flex flex-row">

                <Sidebar />

                <ChannelSidebar />

                {children}

            </main>
        </div>
    ) : (
        <LoginPage setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
    );
}
