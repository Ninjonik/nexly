"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import './globals.css'
import 'tippy.js/dist/tippy.css';
import {UserContextProvider} from "@/app/UserContext";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Nexly',
//   description: "It's time to combine Discord, Teamspeak, Skype and Telegram into one!",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}
