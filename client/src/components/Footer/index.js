"use client";

import React from "react";
import Image from "next/image";
import logo from "../../assets/img/ARS-VECTOR.png";
import footerLogo from "../../assets/img/ARS LOGO FOOTER.png";
import linkedinIcon from "../../assets/icons/Linkedin Logo.svg";
import facebookIcon from "../../assets/icons/Facebook Logo.svg";
import instagramIcon from "../../assets/icons/Instagram Logo.svg";
import { footerNavItems, footerPrivItems } from "@/data/footerItems";
import { paths } from "@/data/paths";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-neutral-20 text-neutral-100 p-6 md:p-16 justify-between">
      <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 max-w-full md:max-w-[350px] gap-6 md:gap-0">
          <div className="flex flex-row md:flex-col md:items-center gap-32 md:gap-6">
            <a
              href={paths.home}
              className="flex flex-col md:flex-row flex-wrap items-center md:space-x-3 md:rtl:space-x-reverse"
            >
              <Image
                src={logo}
                alt="Abi Rached Studios logo"
                width={75}
                height={75}
                className="hidden md:block"
              />
              <Image src={footerLogo} alt="Abi Rached Studios logo"
                width={165}
                height={150}
                className="block md:hidden"/>
              <div className="flex flex-col text-center md:text-left hidden md:block">
                <p className="md:font-headline-large text-headline-medium md:text-headline-large text-gold font-bold">
                  ABIRACHED 
                </p>
                <p className="md:font-headline-large text-headline-medium md:text-headline-large text-gold font-bold">
                  STUDIOS
                </p>
              </div>
            </a>
            <div className="flex justify-end md:justify-center space-x-4">
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
        <div className="flex flex-wrap md:flex-row items-baseline md:items-start justify-between gap-6 md:gap-[6rem] mt-8">
          <div className="">
            <h3 className="text-gold mb-2 text-title-medium md:font-title-large-bold">
              {lang === "es" ? "NAVEGACIÓN" : "NAVIGATION"}
            </h3>
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
          <div className="mt-4 md:mt-0 order-3 md:order-2">
            <h3 className="text-gold mb-2 text-title-medium md:font-title-large-bold">
              {lang === "es" ? "INSTITUCIONAL" : "INSTITUTIONAL"}
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
          <div className="mt-4 md:mt-0 order-2 md:order-3">
            <h3 className="text-gold mb-2 text-title-medium md:font-title-large-bold">
              {lang === "es"
                ? "PRIVACIDAD Y TERMINOS DE USO"
                : "PRIVACY AND TERMS OF USE"}
            </h3>
            <ul className="space-y-1">
              {footerPrivItems.map((item) => (
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
