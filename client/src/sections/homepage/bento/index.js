"use client";

import Image from "next/image";
import logo from "../../../assets/img/ARS-VECTOR.png";
import team from "../../../assets/img/team 1.png";
import smoke from "../../../assets/img/smoke-bg.webp";
import { Cta } from "@/components/commons/Cta";
import { paths } from "@/data/paths";

export default function BentoSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${smoke.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="my-12"
    >
      <div className="relative px-6 my-8">
        <div className="flex gap-4 justify-between items-center">
          <div
            className="h-screen flex justify-center items-center text-center bg-neutral-10 p-6"
            style={{
              width: "432px",
              height: "420px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo con transparencia
            }}
          >
            <div className="text-center">
              <h2 className="font-headline-medium text-headline-medium text-gold font-bold mb-6">
                Heading Copy
              </h2>
              <p className="font-title-large text-title-large text-primary-100">
                ¡Es nuestra filosofía y nuestro compromiso! Vivimos la pasión
                por jugar, la creatividad al crear y la conexión con nuestra
                comunidad.
              </p>
            </div>
          </div>
          <div>
            <Image
              src={logo}
              alt="Abi Rached Studios logo"
              width={368}
              height={417}
            />{" "}
          </div>
          <div
            className="h-screen flex justify-center items-center text-center bg-neutral-10 p-6"
            style={{
              width: "432px",
              height: "420px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo con transparencia
            }}
          >
            <p className="font-title-large text-title-large text-primary-100">
              Nuestro equipo, compuesto por apasionados profesionales, busca
              crear experiencias innovadoras y emocionantes en el desarrollo de
              videojuegos.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center px-6">
        <div>
          <div
            className="flex flex-col justify-center items-center text-center"
            style={{
              width: "641px",
              height: "420px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo con transparencia
            }}
          >
            <h2 className="font-headline-medium text-headline-medium text-gold font-bold mb-6">
              ¡UNITE A NUESTRO EQUIPO!
            </h2>
            <p className="font-title-large text-title-large text-primary-100">
              Sumate en esta aventura y explota tu potencial
            </p>
            <Cta className="mt-12" href={paths.positions}>
              VER POSICIONES
            </Cta>
          </div>
        </div>
        <div>
          <Image
            src={team}
            alt="Abi Rached Studios team"
            width={641}
            height={417}
          />{" "}
        </div>
      </div>
    </div>
  );
}
