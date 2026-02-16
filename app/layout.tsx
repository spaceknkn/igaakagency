import type { Metadata } from "next";
import { outfit, playfairDisplay } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://spaceknkn.github.io'),
  title: "IGAAK | DJ Agency",
  description: "Representing the world's leading DJs and music producers.",
  openGraph: {
    title: "IGAAK | DJ Agency",
    description: "Representing the world's leading DJs and music producers.",
    url: 'https://spaceknkn.github.io/igaakagency',
    siteName: 'IGAAK',
    images: [
      {
        url: 'https://spaceknkn.github.io/igaakagency/home-og.jpg',
        width: 800,
        height: 800,
        alt: 'IGAAK Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGAAK | DJ Agency',
    description: "Representing the world's leading DJs and music producers.",
    images: ['https://spaceknkn.github.io/igaakagency/home-og.jpg'],
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
