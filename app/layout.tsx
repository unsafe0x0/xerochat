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
  metadataBase: new URL("https://xerochat.tech"),
  title: {
    default: "XeroChat",
    template: "%s | XeroChat",
  },
  description:
    "XeroChat is an open source AI chat interface built with Next.js. Connect with GPT-OSS, Llama, and other LLMs. Fast, responsive, modern, and developer-friendly.",
  keywords: [
    "XeroChat",
    "Unsafezero",
    "unsafezero",
    "AI chat",
    "AI assistant",
    "LLM chat UI",
    "Next.js AI",
    "GPT OSS",
    "Llama AI model",
    "OpenRouter API",
    "real-time AI chat",
    "dark mode chat app",
    "open source AI project",
    "AI developer tools",
  ],
  authors: [{ name: "unsafezero", url: "https://x.com/unsafezero" }],
  creator: "unsafezero",
  publisher: "XeroChat",
  alternates: {
    canonical: "https://xerochat.tech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "XeroChat",
    description:
      "Modern AI chat interface for GPT-OSS, Llama, and more. Built with Next.js. Open source, fast, and customizable.",
    url: "https://xerochat.tech",
    siteName: "XeroChat",
    images: [
      {
        url: "https://xerochat.tech/og.avif",
        width: 1200,
        height: 630,
        alt: "XeroChat – Open Source AI Chat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XeroChat",
    description:
      "Fast, modern AI chat built with Next.js. Supports GPT-OSS, Llama, and OpenRouter API. Open source and developer-friendly.",
    images: ["https://xerochat.tech/og.avif"],
    creator: "@unsafezero",
    site: "@unsafezero",
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
