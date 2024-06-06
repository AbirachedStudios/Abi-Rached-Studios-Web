"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/img/ARS-VECTOR.png";
import linkedinIcon from "../../assets/icons/Linkedin Logo.svg";
import facebookIcon from "../../assets/icons/Facebook Logo.svg";
import instagramIcon from "../../assets/icons/Instagram Logo.svg";
import { footerNavItems } from "@/data/footerItems";
import { paths } from "@/data/paths";
const Footer = () => {
  const [lang, setLang] = useState("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "default";
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    console.log("Language set to:", lang); // Debugging line
  }, [lang]);

  const handleLanguageChange = (lang) => {
    setLang(lang);
  };
  return (
    <footer className="bg-neutral-20 text-neutral-100 p-16 justify-between">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 max-w-[350px]">
          <div className="flex flex-col items-center gap-7">
            <a
              href={paths.home}
              className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src={logo}
                alt="Abi Rached Studios logo"
                width={75}
                height={75}
              />
              <div>
                <p className="font-headline-large text-headline-large text-gold font-bold">
                  ABI RACHED
                </p>
                <p className="font-headline-large text-headline-large text-gold font-bold">
                  STUDIOS
                </p>
              </div>
            </a>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-neutral-100 hover:text-primary-60">
                <Image src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a href="#" className="text-neutral-100 hover:text-primary-60">
                <Image src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="text-neutral-100 hover:text-primary-60">
                <Image src={instagramIcon} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row gap-[6rem] mt-8">
          <div>
            <h3 className="text-gold mb-2 font-title-large-bold">NAVEGACIÓN</h3>
            <ul className="space-y-1">
              {footerNavItems.map((item) => (
                <li key={item.default}>
                  <a
                    href={item.url}
                    className="hover:text-primary-60 font-title-large"
                  >
                    {lang === "es" ? item.es : item.default}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-gold mb-2 font-title-large-bold">
              INSTITUCIONAL
            </h3>
            <address className="not-italic space-y-1">
              <p className="font-title-large">Av. Alicia Moreau de Justo 350</p>
              <p className="font-title-large">(+54) 11-1234-5678</p>
              <p>
                <a
                  href="mailto:abirachedstudios@gmail.com"
                  className="hover:text-primary-60 font-title-large"
                >
                  abirachedstudios@gmail.com
                </a>
              </p>
            </address>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-gold mb-2 font-title-large-bold">
              PRIVACIDAD Y TERMINOS DE USO
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-primary-60 font-title-large">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-60 font-title-large">
                  Términos de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-60 font-title-large">
                  Legales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-60 font-title-large">
                  Afiliados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-60 font-title-large">
                  Inversiones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
