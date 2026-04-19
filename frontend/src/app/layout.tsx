import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { FacebookPixel, GoogleTagManager, GTMNoScript } from "@/components/layout/Tracking";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CrackNCode — Digital Excellence",
    template: "%s | CrackNCode",
  },
  description: "Premium digital services, products, and education. Build, grow, and scale your digital presence with CrackNCode.",
  keywords: ["digital agency", "web development", "digital marketing", "online courses", "CrackNCode"],
  openGraph: {
    title: "CrackNCode — Digital Excellence",
    description: "Premium digital services, products, and education.",
    url: "https://crackncode.com",
    siteName: "CrackNCode",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <FacebookPixel />
      </head>
      <body className={`${nunito.variable} font-sans antialiased font-light`}>
        <GTMNoScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
