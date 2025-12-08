import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visualise.Co — Professional Video Editing & Motion",
  description: "Create · Edit · Enhance · Share — Professional video editing, color grading, motion graphics and VFX.",
  keywords: ["video editing", "motion graphics", "color grading", "VFX", "visualise.co", "video production"],
  authors: [{ name: 'Visualise.Co', url: 'https://visualise.co' }],
  openGraph: {
    title: 'Visualise.Co — Professional Video Editing & Motion',
    description: 'From raw footage to breathtaking final cuts. Professional editing, color grading, and sound design.',
    url: 'https://visualise.co',
    siteName: 'Visualise.Co',
    images: [
      {
        url: '/images/about-hero.svg',
        width: 1200,
        height: 630,
        alt: 'Visualise.Co — Video Editing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visualise.Co — Professional Video Editing & Motion',
    description: 'Professional video editing, color grading, and motion graphics.',
    images: ['/images/about-hero.svg'],
    creator: '@visualiseco'
  },
  metadataBase: new URL('https://visualise.co'),
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
