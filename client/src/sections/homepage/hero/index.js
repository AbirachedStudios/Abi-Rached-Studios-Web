import { Cta } from "@/components/commons/Cta";
import backgroundImg from "../../../assets/img/herobg.svg";

export default function HeroSection() {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-end md:items-center md:justify-center mb-12 pt-24"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-left md:text-center text-white max-w-xl mb-16 px-6 md:mb-0">
        <h1 className="text-headline-large font-headline-large md:text-4xl lg:text-5xl font-bold text-gold mb-4 leading-tight">
          Jugamos, creamos, conectamos
        </h1>
        <p className="text-body-large font-body-large md:text-xl mb-6 leading-relaxed">
          ¡Únete a una aventura épica con 'La Leyenda de Kitsune'! Sumérgete en
          un mundo fascinante creado con pasión por Abi Rached Studios. ¡Únete
          al viaje hoy mismo y experimenta la magia de nuestro próximo
          lanzamiento!
        </p>
        <Cta className="text-black py-3 px-6 transition">DESCARGA EL JUEGO</Cta>
      </div>
    </div>
  );
}
