import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Rhyme Automation Pipeline",
  description: "Automated content creation pipeline with n8n, AI tools, and YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
