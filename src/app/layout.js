import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar/Navbar'
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CaraShop",
  description: "Votre boutique en ligne préférée",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        <main>
          {children}
        </main>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
