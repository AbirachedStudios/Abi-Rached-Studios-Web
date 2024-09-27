// app/layout.js
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
<<<<<<< HEAD:src/app/layout.js
import { LanguageProvider } from "@/context/LanguageContext";
=======
>>>>>>> feature-backend:client/src/app/layout.js

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abi Rached Studios - Homepage",
  description:
    "Welcome to Abi Rached Studios. We are an indie video game development studio from Argentina, created by gamers for gamers. Discover our upcoming releases.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD:src/app/layout.js
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
=======
        <Navbar />
        {children}
        <Footer />
>>>>>>> feature-backend:client/src/app/layout.js
      </body>
    </html>
  );
}
