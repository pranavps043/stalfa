import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import HoverFooter from "@/components/ui/hover-footer";
import CookieConsent from "@/components/ui/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stalfa | IT Solutions & Software Development Company",
    template: "%s | Stalfa",
  },
  description:
    "Stalfa is an IT company delivering modern software solutions, web and mobile app development, cloud services, UI/UX design, and digital transformation for businesses.",
  keywords: [
    "Stalfa IT company",
    "software development",
    "web development",
    "mobile app development",
    "IT solutions",
    "cloud services",
    "UI UX design",
    "digital transformation",
    "technology company",
  ],
  openGraph: {
    title: "Stalfa | IT Solutions & Software Development Company",
    description:
      "Stalfa is a technology-driven IT company providing software development, web & mobile applications, cloud solutions, and digital services for growing businesses.",
    type: "website",
    locale: "en_US",
    siteName: "Stalfa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`} suppressHydrationWarning>
        <div className="relative min-h-screen w-full overflow-hidden">

          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          <main className="relative z-10 min-h-screen w-full">
            {children}
          </main>
          <HoverFooter />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
