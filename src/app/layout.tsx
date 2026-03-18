import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UiStateProvider } from "@/components/ui-state";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRAVA GRAVEL",
  description: "Premium gravel community platform focused on routes, rides and local chapters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UiStateProvider>{children}</UiStateProvider>
      </body>
    </html>
  );
}
