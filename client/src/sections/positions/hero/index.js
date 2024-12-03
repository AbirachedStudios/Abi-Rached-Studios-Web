"use client";

import React from "react";
import styles from "../../homepage/talents/styles.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection(){
    const { lang } = useLanguage();
    return (<div>
        const {lang} = useLanguage(); return (
        <div className="relative bg-black text-white text-center overflow-hidden h-[70vh] mt-24 md:mt-32 p-4 md:p-0">
          {/* Contenedor del texto y botón */}
          <div className="z-10 relative top-[48%] md:top-[25%]">
            <h2 className="text-headline-small text-gold md:text-display-medium w-full md:max-w-3xl relative left-0 md:left-[20%]">
              POSICIONES ABIERTAS
            </h2>
            <p></p>
            
          </div>
  
          {/* Barras de colores */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute top-4 md:top-8 right-0 md: w-[160px] h-[24px] md:w-[519px] md:h-[48px] opacity-80 rounded-l-full ${styles.purpleRight}`}
            ></div>
            <div
              className={`absolute top-14 md:top-28 right-0 w-[120px] h-[24px] md:w-[419px] md:h-[48px] opacity-80 rounded-l-full ${styles.tealRight}`}
            ></div>
            <div
              className={`absolute top-24 md:top-48 right-0 w-[80px] h-[24px] md:w-[319px] md:h-[48px] opacity-80 rounded-l-full ${styles.orangeRight}`}
            ></div>
            <div
              className={`absolute top-[135px] md:top-[270px] right-0 w-[48px] h-[24px] md:w-[219px] md:h-[48px] opacity-80 rounded-l-full ${styles.goldRight}`}
            ></div>
            <div
              className={`absolute top-[210px] md:top-32 left-0 w-[48px] h-[24px] md:w-[219px] md:h-[48px] opacity-80 rounded-r-full ${styles.goldLeft}`}
            ></div>
            <div
              className={`absolute top-[250px] md:top-[210px] left-0 w-[80px] h-[24px] md:w-[319px] md:h-[48px] opacity-80 rounded-r-full ${styles.orangeLeft}`}
            ></div>
            <div
              className={`absolute top-[290px] md:top-[290px] left-0 w-[120px] h-[24px] md:w-[419px] md:h-[48px] opacity-80 rounded-r-full ${styles.tealLeft}`}
            ></div>
            <div
              className={`absolute top-[330px] md:top-[370px] left-0 w-[160px] h-[24px] md:w-[519px] md:h-[48px] opacity-80 rounded-r-full ${styles.purpleLeft}`}
            ></div>
          </div>
        </div>
        );
      </div>)
}