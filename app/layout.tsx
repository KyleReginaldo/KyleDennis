import Navbar from "@/components/ui/navbar"
import { MantineProvider } from "@mantine/core"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kyle Reginaldo - Software Developer",
  description:
    "Software developer specializing in building exceptional digital experiences. Currently focused on developing mobile applications using Flutter and web applications using Next.js and React.",
  icons: {
    icon: '/kyle.ico',      // primary (PNG is widely supported)
    shortcut: '/kyle.ico',  // fallback .ico
    apple: '/kyle.png',     // apple touch
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}> 
        <MantineProvider>
          <Navbar />
          <main>
            <Suspense>{children}</Suspense>
          </main>
        </MantineProvider>
      </body>
    </html>
  )
}
