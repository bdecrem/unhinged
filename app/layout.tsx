import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello Rani!",
  description: "hey hey hey",
  metadataBase: new URL("https://unhinged.fyi"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
