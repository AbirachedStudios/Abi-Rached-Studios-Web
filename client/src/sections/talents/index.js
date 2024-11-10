import React from "react";
import styles from "./styles.module.css";

export default function Talents() {
  return (
    <div className="relative bg-black text-white text-center  overflow-hidden h-[110vh]">
      {/* Contenedor del texto y botón */}
      <div className="z-10 relative top-[40%] left-[20%]">
        <h2 className="text-display-medium max-w-3xl">
          Conocé los <span className="text-[#8D7FFF]">talentos</span> detrás de
          cada uno de nuestros proyectos
        </h2>
        <button className="mt-6 px-6 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300">
          NUESTRO EQUIPO
        </button>
      </div>

      {/* Barras de colores */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-8 right-0 w-[519px] h-[48px] opacity-80 rounded-l-full ${styles.purpleRight}`}
        ></div>
        <div
          className={`absolute top-28 right-0 w-[419px] h-[48px] opacity-80 rounded-l-full ${styles.tealRight}`}
        ></div>
        <div
          className={`absolute top-48 right-0 w-[319px] h-[48px] opacity-80 rounded-l-full ${styles.orangeRight}`}
        ></div>
        <div
          className={`absolute top-[270px] right-0 w-[219px] h-[48px] opacity-80 rounded-l-full ${styles.goldRight}`}
        ></div>
        <div
          className={`absolute top-[335px] left-0 w-[219px] h-[48px] opacity-80 rounded-r-full ${styles.goldLeft}`}
        ></div>
        <div
          className={`absolute top-[420px] left-0 w-[319px] h-[48px] opacity-80 rounded-r-full ${styles.orangeLeft}`}
        ></div>
        <div
          className={`absolute top-[505px] left-0 w-[419px] h-[48px] opacity-80 rounded-r-full ${styles.tealLeft}`}
          
        ></div>
        <div
          className={`absolute top-[590px] left-0 w-[519px] h-[48px] opacity-80 rounded-r-full ${styles.purpleLeft}`}
          
        ></div>
      </div>
    </div>
  );
}
