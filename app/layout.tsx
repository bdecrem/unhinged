import type { Metadata } from "next";
import { Syne, Figtree, Bebas_Neue, Caveat, Finger_Paint } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});


const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: "swap",
});

const fingerPaint = Finger_Paint({
  subsets: ["latin"],
  variable: "--font-finger-paint",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "unhinged.",
  description: "he was a chapter. you're the whole book.",
  metadataBase: new URL("https://unhinged.fyi"),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🫶</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${figtree.variable} ${bebas.variable} ${caveat.variable} ${fingerPaint.variable}`}>{children}</body>
    </html>
  );
}
