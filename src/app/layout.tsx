import type { Metadata } from "next";
import { Nunito, Kalam } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chore Board",
  description: "A cozy place to stay organized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${kalam.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Matsu watercolor texture overlay */}
        <div className="texture" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
