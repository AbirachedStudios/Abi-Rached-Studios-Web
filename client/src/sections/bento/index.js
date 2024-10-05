"use client";

import Image from "next/image";
import logo from "../../assets/img/ARS-VECTOR.png";

export default function BentoSection() {
  return (
    <>
      <div className="px-6 my-8">
        <div className="flex gap-4 justify-between items-center">
          <div className="h-screen flex justify-center items-center text-center bg-neutral-10 p-6 radius-"
            style={{ width: "432px", height: "420px", borderRadius: "10px" }}>
            <div
              
              className="text-center bg-neutral-10"
            >
              <h2 className="font-headline-medium text-headline-medium text-gold font-bold  mb-6">
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
            className="h-screen flex justify-center items-center text-center bg-neutral-10 p-6 radius-"
            style={{ width: "432px", height: "420px", borderRadius: "10px" }}
          >
            <p className="font-title-large text-title-large text-primary-100">
              Nuestro equipo, compuesto por apasionados profesionales, busca
              crear experiencias innovadoras y emocionantes en el desarrollo de
              videojuegos.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
