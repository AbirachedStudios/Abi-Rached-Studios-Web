import React, { useState } from "react";
import { positionsItems } from "@/data/positions/positionsItems";
import backgroundImg from "../../../assets/img/bluesmoke.webp";
import { useLanguage } from "@/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/data/paths";

// Componente de tarjeta individual
const PositionCard = ({
  icon,
  title,
  game,
  url,
  info,
  colorClass,
  apply,
  isActive,
  onHover,
  onLeave,
}) => (
  <a
    href={isActive ? undefined : url} // Desactiva el enlace si está activa
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onClick={onHover} // Activa en móviles al hacer click
    className={`p-6 rounded-md flex flex-col items-center justify-center transition-transform transition ease-in-out delay-150 bg-primary-100 md:w-[316px] h-[316px] text-white ${
      isActive ? "bg-opacity-90 scale-105 " : "hover:scale-105 "
    }`}
    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
  >
    {isActive ? (
      // Contenido detallado si la tarjeta está activa
      <div className="flex flex-col items-center text-center">
        <div className={`text-4xl mb-4 text-${colorClass}`}>
          <Image src={`/assets/icons/${icon}`} width={60} height={60} />
        </div>
        <h3 className={`text-${colorClass} text-headline-small`}>{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{info}</p>
        <Link href={`${paths.positions}/${url}`}
          className="px-4 py-2 bg-none text-title-large text-gold border-[1px] md:w-full border-gold rounded-md hover:bg-primary-60 hover:text-primary-0 hover:border-primary-60 transition" >
          {apply}
        </Link>
          
      </div>
    ) : (
      // Contenido estándar de la tarjeta
      <>
        <div className={`text-4xl mb-4 text-${colorClass}`}>
          <Image src={`/assets/icons/${icon}`} width={120} height={120} />
        </div>
        <h3 className="font-bold title-medium text-gold">{game}</h3>
        <p
          className={`text-${colorClass} text-headline-small text-center mt-2`}
        >
          {title}
        </p>
      </>
    )}
  </a>
);

// Componente principal que contiene el slider y las tarjetas
export default function PositionSlide() {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState(null); // Estado para rastrear la tarjeta activa

  const handleHover = (id) => setActiveId(id); // Activar una tarjeta
  const handleLeave = () => setActiveId(null); // Desactivar tarjetas activas

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
      }}
    >
      {/* Versión de Escritorio */}
      <div className="hidden md:grid grid-cols-4 gap-8 p-6">
        {positionsItems.map((position) => (
          <PositionCard
            key={position.id}
            icon={position.icon}
            title={lang === "es" ? position.title.es : position.title.default}
            game={lang === "es" ? position.game.es : position.game.default}
            info={lang === "es" ? position.info.es : position.info.default}
            apply={lang === "es" ? position.apply.es : position.apply.default}
            url={position.url}
            colorClass={position.colorClass}
            isActive={activeId === position.id}
            onHover={() => handleHover(position.id)}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {/* Versión Mobile */}
      <div className="md:hidden p-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          modules={[Navigation]}
          className="mySwiper"
        >
          {positionsItems.map((position) => (
            <SwiperSlide key={position.id}>
              <PositionCard
                icon={position.icon}
                title={
                  lang === "es" ? position.title.es : position.title.default
                }
                game={lang === "es" ? position.game.es : position.game.default}
                info={lang === "es" ? position.info.es : position.info.default}
                apply={lang === "es" ? position.apply.es : position.apply.default}
                url={position.url}
                colorClass={position.colorClass}
                isActive={activeId === position.id}
                onHover={() => handleHover(position.id)}
                onLeave={handleLeave}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
