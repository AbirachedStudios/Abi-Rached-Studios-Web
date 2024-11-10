import React from 'react';

export default function Talents() {
  return (
    <div className="relative bg-black text-white text-center py-20 overflow-hidden">
      {/* Contenedor del texto y botón */}
      <div className="z-10 relative">
        <h1 className="text-2xl font-bold">
          Conocé los <span className="text-purple-400">talentos</span> detrás de cada uno de nuestros proyectos
        </h1>
        <button className="mt-6 px-6 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300">
          NUESTRO EQUIPO
        </button>
      </div>
      
      {/* Barras de colores */}
      <div className="absolute inset-0 flex justify-around items-center pointer-events-none">
        <div className="w-36 h-5 bg-purple-400 rounded-full opacity-80 transform -translate-y-28"></div>
        <div className="w-36 h-5 bg-teal-500 rounded-full opacity-80 transform translate-y-12"></div>
        <div className="w-36 h-5 bg-orange-500 rounded-full opacity-80 transform -translate-y-36"></div>
        <div className="w-36 h-5 bg-yellow-400 rounded-full opacity-80 transform translate-y-24"></div>
      </div>
    </div>
  );
}
