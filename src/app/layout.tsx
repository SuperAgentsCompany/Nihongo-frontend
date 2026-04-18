import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUPAA - The Multi-Agent Orchestration Layer",
  description: "Design, deploy, and scale autonomous teams of AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
