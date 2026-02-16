import type { Metadata } from "next";
import { outfit, playfairDisplay } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://spaceknkn.github.io/igaakagency'),
  title: "IGAAK | DJ Agency",
  description: "Representing the world's leading DJs and music producers.",
  openGraph: {
    title: "IGAAK | DJ Agency",
    description: "Representing the world's leading DJs and music producers.",
    url: 'https://spaceknkn.github.io/igaakagency',
    siteName: 'IGAAK',
    images: [
      {
        url: '/home-og.jpg',
        width: 1200,
        height: 630,
        alt: 'IGAAK Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-black flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
