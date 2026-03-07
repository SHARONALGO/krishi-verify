import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "KRISHI-VERIFY - Decentralized MSP Transparency Platform",
  description: "Farmer-owned data platform ensuring tamper-proof procurement transparency",
  keywords: ["agriculture", "blockchain", "MSP", "transparency", "farmers"],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 md:ml-64 pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
