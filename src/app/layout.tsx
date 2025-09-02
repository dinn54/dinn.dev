import type { Metadata } from "next";
import "./globals.css";
import "tippy.js/dist/tippy.css";

// layout.tsx
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/features/header";
import ClientSideWrapper from "@/shared/ui/pageProgressBar";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Dinn.dev",
  description: "개발자 주정혁의 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-rubik relative ${noto.variable} darkMode-animate flex h-[clamp(600px,100vh,1440px)] w-screen justify-center antialiased`}
      >
        <Header />
        <ClientSideWrapper>
          <div className="scrollbar-hide flex h-full w-full animate-none flex-col overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </ClientSideWrapper>
      </body>
    </html>
  );
}
