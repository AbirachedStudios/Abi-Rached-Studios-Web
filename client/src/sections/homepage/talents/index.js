import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export default function Talents() {
  return (
    <div className="relative bg-black text-white text-center  overflow-hidden h-[110vh] my-12">
      {/* Contenedor del texto y botón */}
      <div className="z-10 relative  top-[50%]">
        <h2 className="text-display-medium max-w-3xl relative left-[25%]">
          Conocé los <span className="text-[#8D7FFF]">talentos</span> detrás de
          cada uno de nuestros proyectos
        </h2>
        <p></p>
        <Link
          href="#"
          className="mt-6 px-24 py-4 text-headline-small border-2 border-gold text-gold hover:text-primary-60 hover:border-primary-60 transition-colors duration-300 inline-block relative left-10"
          style={{ borderRadius: "5px" }}
        >
          NUESTRO EQUIPO
        </Link>
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
