import { Cta } from "@/components/commons/Cta";
import backgroundImg from "../../assets/img/herobg.svg";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div
      className=" h-screen"
      style={{
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh auto",
        gap: "2rem",
        textWrap: "balance",
        
      }}
    >
      <div
        className=" flex items-center justify-center flex-col gap-4"
        style={{ height: "120vh", textAlign: "center" }}
      >
        <h1 className="font-headline-large text-headline-large text-gold font-bold">
          Jugamos, creamos, conectamos
        </h1>
        <p className="text-lg text-white mb-8" style={{ maxWidth: "520px" }}>
          ¡Únete a una aventura épica con 'La Leyenda de Kitsune'! Sumérgete en
          un mundo fascinante creado con pasión por Abi Rached Studios. Únete al
          viaje hoy mismo y experimenta la magia de nuestro próximo lanzamiento!
        </p>
        <Cta>DESCARGA EL JUEGO</Cta>
      </div>
    </div>
  );
}
