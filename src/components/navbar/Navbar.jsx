'use client'
import React, { useState } from 'react'
import logo from '../../../public/assets/images/logo.png'
import Image from 'next/image'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";


const Navbar = ({onHomeClick, onRegisterClick, onNewsClick, onTalentsClick, onContactClick}) => {
  const [mobile, setMobile] = useState(false);


  return (
    <div className="w-full h-24 fixed flex flex-row justify-between sm:x-12 px-2 top-0 left-0 z-50 bg-black/20">
      <div className='sm:w-[20%] w-1/2 sm:pt-4 pt-2'>
        <Image src={logo} alt="logo-navbar" className="sm:w-1/2 w-[80%]">
        </Image>
      </div>
      {/* Menu para movil */}
      <div className='sm:hidden flex'>
        {mobile ? <IoClose size={72} color='#D1A121' className="pr-2 mt-2" onClick={() => setMobile(false)} /> : <IoMenu size={72} color='#D1A121' className="pr-4 mt-4" onClick={() => setMobile(true)} />}
      </div>
      {/* Menu para escritorio*/}
      <div className='sm:flex hidden flex-row items-center justify-between w-[80%]'>
        <div className='w-2/3 flex flex-row items-center justify-evenly text-[#D1A121]'>
          <button onClick={onHomeClick} className="hover:text-white">Inicio</button>
          <a href="">Juegos</a>
          <button onClick={onNewsClick} className="hover:text-white transition-colors">Novedades</button>
          <button onClick={onTalentsClick} className="hover:text-white transition-colors">Talentos</button>
          <button onClick={onContactClick} className="hover:text-white transition-colors">Soporte</button>
        </div>
        <div className='w-1/3 flex flex-row'>
          <button onClick={onRegisterClick} className='bg-[#D1A121] font-medium uppercase w-[60%] p-1 rounded-md'>Inscribite en la beta</button>
          <div className='flex flex-row items-center justify-center w-[40%] text-white'>
            <span className='m-2'>ES</span>
            <span className='m-2'>EN</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar