'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/components/Dashboard/Dashboard";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      const data = localStorage.getItem('user');
      
      if (!data) {
        router.push('/');
        return;
      }

      try {
        const storedUser = JSON.parse(data);
        if (storedUser && storedUser.role === 'ADMIN') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D1A121] mb-4"></div>
        <p className="text-[#D1A121] text-sm uppercase tracking-widest">Verificando acceso...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="p-8">
        <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-[#D1A121] text-3xl font-bold uppercase tracking-tighter">
              Admin <span className="text-white">Panel</span>
            </h1>
            <p className="text-gray-500 text-xs">Gestión de contenidos y equipo</p>
          </div>

          {/* BOTÓN CERRAR SESIÓN DE ADMIN */}
          <button 
            onClick={() => {
              localStorage.removeItem('user');  // Borra los datos del usuario
              localStorage.removeItem('token'); // Borra el token de seguridad
              router.push('/');                // Te manda de vuelta a la Landing Page
            }}
            className="px-4 py-2 bg-red-950/20 border border-red-900/50 text-red-500 rounded-lg text-xs hover:bg-red-900/40 transition-all font-medium"
          >
            Cerrar Sesión
          </button>
        </header>

        <Dashboard />
        
      </div>
    </main>
  );
}