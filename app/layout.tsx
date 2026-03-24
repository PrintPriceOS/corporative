import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TelemetryProvider } from "@/components/providers/TelemetryProvider";
import { CookieBanner } from '@/components/monolith/CookieBanner';

import { Manrope, Space_Grotesk, Inter } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

import { constructMetadata, JSON_LD_ORGANIZATION } from "@/lib/seo";

export const metadata: Metadata = constructMetadata();

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ORGANIZATION) }}
          />
      </head>
      <body>
        <ThemeProvider>
          <TelemetryProvider>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </TelemetryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
