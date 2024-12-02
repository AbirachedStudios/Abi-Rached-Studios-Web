"use client";

import Image from "next/image";
import logo from "../../../assets/img/ARS-VECTOR.png";
import team from "../../../assets/img/team 1.png";
import smoke from "../../../assets/img/smoke-bg.webp";
import { Cta } from "@/components/commons/Cta";
import { paths } from "@/data/paths";
import styles from "./styles.module.css";

export default function BentoSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${smoke.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`my-32 md:my-12 ${styles.imgSmoke}`}
    >
      <div className="relative px-6 my-8">
        <div className="flex flex-row gap-2 md:gap-4 justify-between items-center flex-wrap">
          <div
            className={`h-screen flex justify-center items-center text-center bg-neutral-10 py-4 md:p-6 ${styles.box}`}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div className="text-center">
              <h2 className="md:font-headline-medium text-title-medium md:text-headline-medium text-gold font-bold mb-6">
                Heading Copy
              </h2>
              <p className="md:font-title-large text-title-small md:text-title-large text-primary-100">
                ¡Es nuestra filosofía y nuestro compromiso! Vivimos la pasión
                por jugar, la creatividad al crear y la conexión con nuestra
                comunidad.
              </p>
            </div>
          </div>
          <div
            className={`h-screen flex justify-center items-center text-center bg-neutral-10 p-4 md:p-6 ${styles.box}`}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Image
              src={logo}
              alt="Abi Rached Studios logo"
              width={368}
              height={417}
            />{" "}
          </div>
          <div
            className={`h-screen flex justify-center items-center text-center bg-neutral-10 py-4 md:p-6 ${styles.box}`}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <p className="md:font-title-large text-title-small md:text-title-large text-primary-100 px-2">
              Nuestro equipo,{" "}
              <span className="hidden md:block">
                compuesto por apasionados profesionales,
              </span>{" "}
              busca crear experiencias innovadoras y emocionantes en el
              desarrollo de videojuegos.
            </p>
          </div>
          <div>
            <Image
              src={team}
              alt="Abi Rached Studios team"
              className={`md:hidden block ${styles.box}`}
            />{" "}
          </div>
        </div>
      </div>
      <div className="flex gap-0 md:gap-4 justify-between items-center px-6 mt-[-5%] md:mt-0">
        <div className="w-full md:w-[641px] md:h-[420px] md:p-0">
          <div
            className="flex flex-col justify-center items-center text-center width-[100vw] md:w-[641px] md:h-[420px] px-4 py-2 md:p-0"
            style={{
              
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <h2 className="md:font-headline-medium text-title-medium md:text-headline-medium text-gold font-bold mb-6">
              ¡UNITE A NUESTRO EQUIPO!
            </h2>
            <p className="md:font-title-large text-title-small md:text-title-large text-primary-100 px-2">
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
            className="hidden md:block"
          />{" "}
        </div>
      </div>
    </div>
  );
}
