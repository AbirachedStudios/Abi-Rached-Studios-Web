'use client'
import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="es">
      <body>
        {!isAdminPage && <Navbar />}
        {children}
      </body>
    </html>
  );
}