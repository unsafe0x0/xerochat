import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/utils/ThemeProvider";

const publicSans = Public_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0GPT",
  description: "0GPT - ChatGPT but Reimagined",
  keywords: ["ChatGPT", "AI", "Artificial Intelligence", "Chat", "GPT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={publicSans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
