"use client";

import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { talentItems } from "@/data/homepage/talentsItems";
import { useLanguage } from "@/context/LanguageContext";
import { paths } from "@/data/paths";

export default function Talents() {
  const { lang } = useLanguage();
  return (
    <div className="relative bg-black text-white text-center  overflow-hidden h-[110vh] my-12 p-4 md:p-0">
      {/* Contenedor del texto y botón */}
      <div className="z-10 relative top-[30%] md:top-[50%]">
        <h2 className="text-headline-small md:text-display-medium w-full md:max-w-3xl relative left-0 md:left-[25%]">
          {lang === "es"
            ? talentItems.heading1.es
            : talentItems.heading1.default}{" "}
          <span className="text-[#8D7FFF]">{lang === "es" ? talentItems.span.es : talentItems.span.default }</span> {lang === "es" ? talentItems.heading2.es : talentItems.heading2.default}
        </h2>
        <p></p>
        <Link
          href={paths.team}
          className="mt-6 px-12 py-4 w-full md:w-auto md:px-24 md:py-4 text-title-large md:text-headline-small border-2 border-gold text-gold hover:text-primary-60 hover:border-primary-60 transition-colors duration-300 inline-block relative left-0 md:left-10"
          style={{ borderRadius: "5px" }}
        >
          {lang === "es" ? talentItems.cta.es : talentItems.cta.default}
        </Link>
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
          className={`absolute top-[345px] md:top-[390px] left-0 w-[48px] h-[24px] md:w-[219px] md:h-[48px] opacity-80 rounded-r-full ${styles.goldLeft}`}
        ></div>
        <div
          className={`absolute top-[385px] md:top-[465px] left-0 w-[80px] h-[24px] md:w-[319px] md:h-[48px] opacity-80 rounded-r-full ${styles.orangeLeft}`}
        ></div>
        <div
          className={`absolute top-[423px] md:top-[540px] left-0 w-[120px] h-[24px] md:w-[419px] md:h-[48px] opacity-80 rounded-r-full ${styles.tealLeft}`}
        ></div>
        <div
          className={`absolute top-[462px] md:top-[615px] left-0 w-[160px] h-[24px] md:w-[519px] md:h-[48px] opacity-80 rounded-r-full ${styles.purpleLeft}`}
        ></div>
      </div>
    </div>
  );
}
