import { DockNav } from "@/components/navigation/dock-nav"
import { ChatFab } from "@/components/ui/chat-fab"
import { MantineProvider } from "@mantine/core"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kyle Reginaldo — Product Engineer",
  description:
    "Product engineer who builds complete digital products for real users — mobile apps, web platforms, and the backend systems behind them — from architecture to App Store & Play Store deployment.",
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
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <MantineProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
          </div>
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6">
            <div className="pointer-events-auto">
              <DockNav />
            </div>
          </div>
          <ChatFab />
        </MantineProvider>
      </body>
    </html>
  )
}
