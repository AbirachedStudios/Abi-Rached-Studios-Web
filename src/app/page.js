'use client'
import { useState } from 'react';
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/sections/Hero/Hero";
import Bento from "@/sections/Bento/Bento";
import Loader from "@/components/loader/Loader.jsx";

// Secciones Dinámicas
import Talents from "@/sections/Talents/Talents";
import Contact from "@/sections/Contact/Contact";
import News from "@/sections/News/News";

// Formularios
import Apply from "@/components/Forms/ApplyForm";
import Login from "@/components/Forms/LoginForm";
import Register from "@/components/Forms/RegisterForm";

export default function Home() {
  // view puede ser: 'home', 'news', 'talents', 'contact'
  const [view, setView] = useState('home'); 
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen">
      <Loader />
      
      <Navbar 
        onHomeClick={() => setView('home')}
        onRegisterClick={() => setActiveForm('register')} 
        onNewsClick={() => setView('news')}
        onTalentsClick={() => setView('talents')}
        onContactClick={() => setView('contact')}
      />

      <main className="pt-24 pb-10">
        {/* --- VISTA POR DEFECTO (HOME) --- */}
        {view === 'home' && (
          <div className="animate-fade-in">
            <Hero />
            <Bento onApplyClick={() => setView('apply')} />
          </div>
        )}

        {/* --- VISTA DE NOVEDADES --- */}
        {view === 'news' && (
          <div className="animate-fade-in px-4">
             <button onClick={() => setView('home')} className="text-[#D1A121] mb-5">← Volver al inicio</button>
             <News />
          </div>
        )}

        {/* --- VISTA DE TALENTOS --- */}
        {view === 'talents' && (
          <div className="animate-fade-in px-4">
            <button onClick={() => setView('home')} className="text-[#D1A121] mb-5">← Volver al inicio</button>
            <Talents />
          </div>
        )}

        {/* --- VISTA DE CONTACTO --- */}
        {view === 'contact' && (
          <div className="animate-fade-in px-4">
            <button onClick={() => setView('home')} className="text-[#D1A121] mb-5">← Volver al inicio</button>
            <Contact />
          </div>
        )}

{/* --- VISTA DE FORMULARIO DE APLICACIÓN --- */}
        {view === 'apply' && (
          <div className="animate-fade-in min-h-screen flex flex-col items-center p-10">
            <button 
              onClick={() => setView('home')} 
              className="mb-8 text-[#D1A121] hover:underline self-start"
            >
              ← Volver al inicio
            </button>
            
            <h2 className="text-3xl font-bold mb-10">Formulario de <span className="text-[#D1A121]">Postulación</span></h2>
            <Apply />
          </div>
        )}

      </main>

      {/* --- FORMULARIOS (MODALES) --- */}
      {/* Esto sigue siendo un modal que aparece SOBRE cualquier vista */}
      {activeForm && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-overlay"
      onClick={() => setActiveForm(null)} // Cerrar al hacer clic fuera
    />
    <div className="relative w-full max-w-md z-[101] animate-modal-entry">
      
      <button 
        onClick={() => setActiveForm(null)}
        className="absolute -top-12 right-0 text-gray-400 hover:text-[#D1A121] transition-colors text-sm uppercase tracking-widest"
      >
        Cerrar [x]
      </button>

      
      <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {activeForm === 'register' && (
  <Register 
    switchToLogin={() => setActiveForm('login')} 
    switchToContact={() => {
      setActiveForm(null); // 1. Cierra el modal de registro
      setView('contact');  // 2. Cambia la vista a contacto
    }} 
  />
)}
        {activeForm === 'login' && (
          <Login switchToRegister={() => setActiveForm('register')} />
        )}
      </div>

    </div>
  </div>
)}
    </div>
  );
}