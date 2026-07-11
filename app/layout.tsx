import { DockNav } from "@/components/navigation/dock-nav"
import { ChatFab } from "@/components/ui/chat-fab"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MantineProvider } from "@mantine/core"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

const SITE_URL = "https://kyle-reginaldo.vercel.app"
const SITE_NAME = "Kyle Reginaldo, Product Engineer"
const SITE_DESCRIPTION =
  "Product engineer who builds complete digital products for real users: mobile apps, web platforms, and the backend systems behind them, from architecture to App Store and Play Store deployment."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s, Kyle Reginaldo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Kyle Reginaldo",
    "Product Engineer",
    "Full Stack Developer",
    "Flutter Developer",
    "Next.js Developer",
    "NestJS Developer",
    "React Native Developer",
    "Mobile App Developer Philippines",
    "Web Developer Philippines",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Kyle Reginaldo", url: SITE_URL }],
  creator: "Kyle Reginaldo",
  publisher: "Kyle Reginaldo",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kyle Reginaldo, Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: '/kyle.ico',      // primary (PNG is widely supported)
    shortcut: '/kyle.ico',  // fallback .ico
    apple: '/kyle.png',     // apple touch
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kyle Reginaldo",
  alternateName: "Kyle Dennis Reginaldo",
  url: SITE_URL,
  image: `${SITE_URL}/assets/kyleai.png`,
  jobTitle: "Product Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Cavite",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/KyleReginaldo",
    "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2",
    "https://www.facebook.com/kyle.dennis.26",
  ],
  knowsAbout: [
    "Flutter",
    "Next.js",
    "NestJS",
    "React Native",
    "TypeScript",
    "Supabase",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <MantineProvider>
          <CursorGlow />
          <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
            <ThemeToggle />
          </div>
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
