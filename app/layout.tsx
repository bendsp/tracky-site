import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tracky.desprets.net"),
  title: "Tracky — Notice where your time goes",
  description:
    "A private, local-first iPhone app for tracking your day and anything else that matters to you.",
  applicationName: "Tracky",
  icons: {
    icon: "/tracky-icon.png",
    apple: "/tracky-icon.png",
  },
  openGraph: {
    title: "Tracky — Notice where your time goes",
    description:
      "Track what you do, log what matters, and find the patterns hiding in an ordinary day.",
    url: "https://tracky.desprets.net",
    siteName: "Tracky",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Tracky — Notice where your time goes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracky — Notice where your time goes",
    description:
      "A private, local-first iPhone app for tracking your day and what matters.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
