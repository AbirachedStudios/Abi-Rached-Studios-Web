import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abi Rached Studios - Homepage",
  description:
    "Welcome to Abi Rached Studios. We are an indie video game development studio from Argentina, created by gamers for gamers. Discover our upcoming releases.",
  robots: "index, follow, max-snippet:-1",
  publisher: "Abi Rached Studios",
  author: "Abi Rached Studios"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="/" />
      </head>
      <body className={`${inter.className} bg-black`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
