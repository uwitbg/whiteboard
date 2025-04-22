import type { Metadata } from "next";
import { Changa, Bruno_Ace } from "next/font/google";

import "./globals.css";

const changa = Changa({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-changa",
});
const bruno_ace = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bruno-ace",
});

export const metadata: Metadata = {
  title: "Free Online Whiteboard – Collaborate & Draw Instantly | UWIT",
  description:
    "Use UWIT's free online whiteboard for instant sketching, note-taking, brainstorming, and team collaboration. No signup needed. Simple, fast, and accessible on any device.",
  keywords: [
    "online whiteboard",
    "free whiteboard",
    "digital whiteboard",
    "collaborative whiteboard",
    "drawing board",
    "canvas app",
    "whiteboard tool",
    "uwit whiteboard",
    "web whiteboard",
    "brainstorm online",
  ],
  metadataBase: new URL("https://board.uwit.rs"),
  openGraph: {
    title: "Free Online Whiteboard – Collaborate & Draw Instantly | UWIT",
    description:
      "Sketch, write, and brainstorm together in real-time with UWIT's free online whiteboard. No sign-up required.",
    url: "https://board.uwit.rs",
    siteName: "UWIT Whiteboard",

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Whiteboard by UWIT",
    description:
      "Collaborate and sketch in real-time with this free online whiteboard. No login, no hassle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${changa.variable} ${bruno_ace.variable}`}>
        {children}
      </body>
    </html>
  );
}
