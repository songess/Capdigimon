import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "캡디지몬",
  description: "AI 기반 산업별 맞춤형 뉴스 브리핑 시스템",
  icons: {
    icon: '/png/capdisimon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
