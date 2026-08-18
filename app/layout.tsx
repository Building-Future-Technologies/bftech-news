import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : new URL("https://www.bftech.news"),
  title: {
    default: "BFTech News",
    template: "%s | BFTech News",
  },
  description: "Latest technology news, analysis, and trends in one place.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "BFTech News",
    description: "Latest technology news, analysis, and trends in one place.",
    siteName: "BFTech News",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BFTech News",
    description: "Latest technology news, analysis, and trends in one place.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
