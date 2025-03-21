"use client";
import Breadcrumb from "@/components/commons/Breacrumbs";
import TeamCards from "@/sections/teams/cards/index";
import backgroundImg from "@/assets/img/bg-blue.png";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroTeam() {
  const { lang } = useLanguage();

  const breadcrumbPaths = [
    { label: "Home", url: "/" },
    { label: "Team", url: null },
    ,
  ];
  return (
    <div
      className="text-primary-100 pt-[200px] px-6"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Breadcrumb paths={breadcrumbPaths} />
      <div className=" text-center pt-12 pb-32 mt-8">
        <h1 className="text-headline-large text-gold">
          {lang === "es" ? "Nuestro Equipo" : "Our Team"}
        </h1>
        <p>
          {lang === "es"
            ? "Conocé a los talentos que hacen de nuestros juegos una realidad"
            : "Meet the talents who make our games a reality"}
        </p>
      </div>
      <TeamCards />
    </div>
  );
}
