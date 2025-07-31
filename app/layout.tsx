import type { Metadata } from "next";
import { Public_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

const primary = Public_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
});

const secondary = Open_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XeroChat - AI Assistant",
  description: "A beautiful dark chat interface powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${primary.variable} ${secondary.variable} antialiased bg-[#1a1a1a] text-neutral-100 h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
