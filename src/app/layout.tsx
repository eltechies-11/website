import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/content/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web, Mobile & Custom Software`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "ELtechies",
    "web development",
    "app development",
    "custom software",
    "IT startup",
    "software development",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Web, Mobile & Custom Software`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1024,
        height: 408,
        alt: `${siteConfig.name} brand banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Web, Mobile & Custom Software`,
    description: siteConfig.shortDescription,
    images: [siteConfig.assets.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#020817",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-navy font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
