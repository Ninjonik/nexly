import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import './globals.css'
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {InnerLayout} from "@/app/InnerLayout";
import Sidebar from "@/app/components/Sidebar";
import ChannelSidebar from "@/app/components/ChannelSidebar";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={`overflow-hidden ${inter.className}`}>
                    <InnerLayout>
                        <Sidebar />
                        <ChannelSidebar />
                        {children}
                    </InnerLayout>
            </body>
        </html>
    )
}