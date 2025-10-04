import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Cursor from "./components/shared/Cursor";

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  metadataBase: new URL("https://magico-space.vercel.app/"),
  title: "Keming Wang | Designer, Developer, Artist",
  description:
    "You are landing in Magico Space. I play and learn like universe, never overfitting.",
  keywords: [
    "web development",
    "data science",
    "analyst",
    "neuroscience",
    "portfolio",
    "Keming Wang",
    "Coco Wang",
    "McGill University",
    "creative coding",
    "artist",
    "UI",
    "UX",
  ],
  authors: [{ name: "Keming Wang" }],
  creator: "Keming Wang",
  charset: "UTF-8",
  openGraph: {
    title: "Keming Wang | Designer, Developer, Artist",
    description: "Keming Wang's creative profile.",
    type: "website",
    locale: "en_US",
    url: "https://kemingwang.xyz",
    images: [
      {
        url: "https://kemingwang.xyz/images/OG.png",
        width: 1200,
        height: 630,
        alt: "Keming Wang site cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keming Wang | Designer, Developer, Artist",
    description:
      "You are landing in Magico Space. I play and learn like universe, never overfitting.",
    images: ["https://magico-space.vercel.app/images/og.png"],
  },
};
export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none h-full ">
        <Cursor />
        <header className="absolute p-3  items-center z-50 flex w-screen"></header>

        <main className=" cursor-none scroll-smooth">{children}</main>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
