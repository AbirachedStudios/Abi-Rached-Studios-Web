"use client";

import Image from "next/image";
import Arg from "../../assets/icons/ARG.svg";
import Us from "../../assets/icons/US.svg";
import { useLanguage } from "@/context/LanguageContext";

export default function Languages() {
  const { setLang } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLang(lang);
  };

  return (
    <div className="flex flex-row gap-2">
      <div
        className="flex flex-col items-center cursor-pointer text-white hover:text-primary-60"
        onClick={() => handleLanguageChange("es")}
      >
        <Image src={Arg} alt="Argentina Flag" width={35} />
        <p>ES</p>
      </div>
      <div
        className="flex flex-col items-center cursor-pointer text-white hover:text-primary-60"
        onClick={() => handleLanguageChange("default")}
      >
        <Image src={Us} alt="US Flag" width={35} />
        <p>EN</p>
      </div>
    </div>
  );
}
