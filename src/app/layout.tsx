import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Church Psychosocial Risk Assessment",
  description: "A comprehensive psychosocial risk assessment tool for churches and Christian organisations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
