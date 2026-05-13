import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/images/logo-square-color.png";
import smoke from '../../../public/assets/images/smoke-background-bento.jpg'
import team from '../../../public/assets/images/team.jpg'

const Bento = ({ onApplyClick }) => {
  return (
    <div className="w-full h-screen bg-black px-12"       style={{
        backgroundImage: `url(${smoke.src})`,
      }}>
      <div className="w-full h-1/2 grid grid-cols-3 gap-4 py-2 z-10">
        <div className="bg-[#ffffff44] w-full h-full flex flex-col items-center justify-center text-center p-4 rounded-md">
          <span className="text-[#D1A121] text-2xl">
            &quot;Jugamos, creamos, conectamos&quot;
          </span>
          <p className="text-white mt-8 w-2/3">
            ¡Es nuestra filosofía y nuestro compromiso! Vivimos la pasión por
            jugar, la creatividad al crear y la conexión con nuestra comunidad.
          </p>
        </div>
        <div className="bg-[#ffffff44] w-full h-full rounded-md flex items-center justify-center ">
          <Image src={logo} alt="logo-bento" className="w-2/3"></Image>
        </div>
        <div className="bg-[#ffffff44] w-full h-full rounded-md p-8 flex items-center justify-center text-center text-white">
          <span>
            Nuestro equipo, compuesto por apasionados profesionales, busca crear
            experiencias innovadoras y emocionantes en el desarrollo de
            videojuegos.
          </span>
        </div>
      </div>
      <div className="w-full h-1/2 grid grid-cols-2 gap-4 py-2 z-10">
        <div className="bg-[#ffffff44] w-full h-full rounded-md flex flex-col items-center justify-around text-center p-8 text-white">
          <span className="uppercase text-[#D1A121] text-xl">¡Unete a nuestro equipo!</span>
          <p className="text-white">Sumate en nuestra aventura y explora tu potencial</p>
          <button onClick={onApplyClick} className="bg-[#D1A121] p-2 uppercase text-black rounded-md font-medium w-1/2">Aplica aquí</button>
        </div>
        <div className="bg-[#ffffff44] w-full h-full rounded-md overflow-hidden">
          <Image src={team} alt='team'/>
        </div>
      </div>
    </div>
  );
};

export default Bento;
