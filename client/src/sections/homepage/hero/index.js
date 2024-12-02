"use client";

import { Cta } from "@/components/commons/Cta";
import backgroundImg from "../../../assets/img/herobg.svg";
import { useLanguage } from "@/context/LanguageContext";
import { heroItems } from "@/data/heroItems";

export default function HeroSection() {
  const { lang } = useLanguage();

  return (
    <div
      className="relative h-screen bg-cover bg-center mb-12 pt-24"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-primary-100 text-center md:text-left max-w-xl mb-16 px-6 md:mb-0 flex flex-col py-32 items-center md:items-start md:justify-center">
        <h1 className="text-headline-large font-headline-large md:text-4xl lg:text-5xl font-bold text-gold mb-4 leading-tight">
          {lang === "es" ? heroItems.h1.es : heroItems.h1.default}
        </h1>
        <p className="text-body-large font-body-large md:text-xl mb-6 leading-relaxed">
          {lang === "es" ? heroItems.copy.es : heroItems.copy.default}
        </p>
        <Cta className="text-black py-3 px-6 transition" style={{ width: "100%" }}>
          {lang === "es" ? heroItems.cta.es : heroItems.cta.default}
        </Cta>
      </div>
    </div>
  );
}
