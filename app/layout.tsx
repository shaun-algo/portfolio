import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaun Michael Belono-ac | Student Developer",
  description:
    "Portfolio of Shaun Michael Belono-ac, a student developer focused on system development, web interfaces, and digital arts.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/book-closing.mp3" as="audio" type="audio/mpeg" />
        <link rel="preload" href="/leaf_open.mp3" as="audio" type="audio/mpeg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
