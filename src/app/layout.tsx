import type { Metadata } from "next";
import "./globals.css";
import "tippy.js/dist/tippy.css";
import localFont from "next/font/local";

import { Inter, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import Header from "@/features/header";
import ClientSideWrapper from "@/shared/ui/pageProgressBar";
import { siteConfig } from "@/shared/config/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
});

const rubik = localFont({
  src: [
    {
      path: "../../public/fonts/Rubik-VariableFont_wght.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rubik-Italic-VariableFont_wght.woff2",

      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${rubik.variable} relative ${noto.variable} ${inter.variable} ${jetbrainsMono.variable} darkMode-animate flex h-[clamp(600px,100vh,1440px)] w-screen justify-center antialiased`}
      >
        <Header />
        <ClientSideWrapper>
          <div
            id="app-scroll-container"
            className="scrollbar-hide flex h-full w-full animate-none flex-col overflow-x-hidden overflow-y-auto"
          >
            {children}
          </div>
        </ClientSideWrapper>
      </body>
    </html>
  );
}
