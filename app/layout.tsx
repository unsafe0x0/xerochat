import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SessionProviderClient from "@/components/SessionProviderClient";

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XeroChat",
  description:
    "XeroChat – Modern AI chat interface built with Next.js. Supports multiple LLM models. Fast, responsive, and open source.",
  keywords: [
    "XeroChat",
    "Unsafezero",
    "Unsafe0x0",
    "AI assistant",
    "chat interface",
    "Next.js AI app",
    "GPT-OSS",
    "Llama model chat",
    "Open Router API",
    "real-time AI chat",
    "dark mode assistant",
    "open source chat UI",
  ],
  openGraph: {
    title: "XeroChat",
    description:
      "Modern AI chat interface built with Next.js. Supports GPT‑OSS, Llama, and more. Fast, responsive, and open source.",
    url: "https://xerochat.tech",
    siteName: "XeroChat",
    images: [
      {
        url: "https://xerochat.tech/og.avif",
        width: 1200,
        height: 630,
        alt: "XeroChat OpenGraph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XeroChat",
    description:
      "Modern AI chat interface built with Next.js. Supports GPT‑OSS, Llama, and more. Fast, responsive, and open source.",
    images: ["https://xerochat.tech/og.avif"],
    creator: "@unsafe0x0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${primary.variable} antialiased bg-[#191919] text-neutral-100`}
      >
        <SessionProviderClient>{children}</SessionProviderClient>
        <Analytics />
      </body>
    </html>
  );
}
