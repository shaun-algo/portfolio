import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaun Michael Belono-ac | Student Developer",
  description:
    "Portfolio of Shaun Michael Belono-ac, a student developer specializing in system development, modern web solutions, and database design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
