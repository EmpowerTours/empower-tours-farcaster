import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmpowerTours Farcaster",
  description: "Web3 Rock Climbing App on Monad",
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
