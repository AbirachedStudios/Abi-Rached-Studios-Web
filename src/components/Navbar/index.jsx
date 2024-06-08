"use client";

import React from "react";
import Button from "../commons/Button";
import Image from "next/image";
import logo from "../../assets/img/ARS-VECTOR.png";
import { navbarItems } from "../../data/navbarItems";
import Languages from "./Languages";
import { paths } from "@/data/paths";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang } = useLanguage(); // Obtener el idioma del contexto
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);

  const toggleButtonVisibility = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href={paths.home}
            className="flex items-center space-x-3 rtl:space-x-reverse"
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
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleButtonVisibility}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isButtonVisible ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gold md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gold md:dark:bg-gray-900 dark:border-gray-700">
              {navbarItems.map((item) => (
                <li key={item.default}>
                  <a
                    href={item.url}
                    className="block py-2 px-3 font-title-large text-title-large rounded transition duration-300 hover:bg-gray-900 md:hover:bg-transparent md:border-0 hover:text-primary-60 md:hover:text-primary-60 md:p-0 text-primary-0 md:text-gold"
                  >
                    {lang === "es" ? item.es : item.default}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${
              isButtonVisible ? "flex" : "hidden md:flex"
            } flex-col md:flex-row gap-2 md:gap-6 w-full md:w-auto my-8 items-center`}
          >
            <Languages />
            <Button
              text="DOWNLOAD DEMO"
              textEs="DESCARGA LA DEMO"
              lang={lang}
              onClick={() => {
                //
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
