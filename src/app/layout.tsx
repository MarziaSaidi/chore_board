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
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>",
  },
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
