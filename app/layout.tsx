import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello Rani!",
  description: "A special greeting from Bart",
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
