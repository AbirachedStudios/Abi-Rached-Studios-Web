import { Cta } from "@/components/commons/Cta";
import backgroundImg from "../../../assets/img/herobg.svg";
import { useLanguage } from "@/context/LanguageContext";
import { heroItems } from "@/data/heroItems";


export default function HeroSection() {
  return (
    <div
      className="relative h-screen bg-cover bg-center  mb-12 pt-24"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-primary-100 text-center md:text-left  max-w-xl mb-16 px-6 md:mb-0 flex flex-col py-32 items-center md:items-start md:justify-center">
        <h1 className="text-headline-large font-headline-large md:text-4xl lg:text-5xl font-bold text-gold mb-4 leading-tight">
          Jugamos, creamos, conectamos
        </h1>
        <p className="text-body-large font-body-large md:text-xl mb-6 leading-relaxed">
          ¡Únete a una aventura épica con 'La Leyenda de Kitsune'! Sumérgete en
          un mundo fascinante creado con pasión por Abi Rached Studios. ¡Únete
          al viaje hoy mismo y experimenta la magia de nuestro próximo
          lanzamiento!
        </p>
        <Cta className="text-black py-3 px-6 transition" style={{width: "100%"}}>DESCARGA EL JUEGO</Cta>
      </div>
    </div>
  );
}
