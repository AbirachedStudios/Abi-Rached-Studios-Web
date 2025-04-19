"use client";
import backgroundImg from "@/assets/img/bg-blue.png";
import Breadcrumb from "@/components/commons/Breacrumbs";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const breadcrumbPaths = [
    { label: "Home", url: "/" },
    { label: "Team", url: null },
    ,
  ];
  return (
    <div
      className="text-center w-full pt-56 pb-24 px-6 mb-12"
      style={{
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      <Breadcrumb paths={breadcrumbPaths} />
      <h1 className="text-headline-large text-gold">
        {lang === "es" ? "Nuestro Equipo" : "Our Team"}
      </h1>
      <p>
        {lang === "es"
          ? "Conocé a los talentos que hacen de nuestros juegos una realidad"
          : "Meet the talents who make our games a reality"}
      </p>
    </div>
  );
}
