import { SiteNav } from "@/components/navigation/site-nav"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { KDLoader } from "@/components/ui/kd-loader"
import { MantineProvider } from "@mantine/core"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

const fugazOne = localFont({
  src: "../public/fonts/Fugaz_One/FugazOne-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-fugaz-one",
  display: "swap",
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
})

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
    icon: 'favicon.ico',      // primary (PNG is widely supported)
    shortcut: 'favicon.ico',  // fallback .ico
    apple: 'favicon.ico',     // apple touch
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
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
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${fugazOne.variable} ${bricolageGrotesque.variable} font-sans antialiased`}>
        <MantineProvider>
          <KDLoader />
          <CursorGlow />
          <SiteNav />
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
          </div>
          {modal}
        </MantineProvider>
      </body>
    </html>
  )
}
