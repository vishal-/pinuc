import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "LocalHub - Find Local Services in Delhi",
  description:
    "Discover local service providers in Delhi including electricians, plumbers, carpenters, tutors, photographers, and event planners. Find trusted professionals near you.",
  keywords: [
    "local services",
    "delhi",
    "electrician",
    "plumber",
    "tutor",
    "photographer",
    "event planner"
  ],
  openGraph: {
    title: "LocalHub - Find Local Services in Delhi",
    description: "Discover trusted local service providers in Delhi",
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
