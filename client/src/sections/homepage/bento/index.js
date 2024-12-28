"use client";

import Image from "next/image";
import logo from "../../../assets/img/ARS-VECTOR.png";
import team from "../../../assets/img/team 1.png";
import smoke from "../../../assets/img/smoke-bg.webp";
import { Cta } from "@/components/commons/Cta";
import { paths } from "@/data/paths";
import { useLanguage } from "@/context/LanguageContext";
import { bentoItems } from "@/data/homepage/bentoItems";
import styles from "./styles.module.css";

export default function BentoSection() {
  const { lang } = useLanguage();
  return (
    <div
      style={{
        backgroundImage: `url(${smoke.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`my-32 md:my-12 ${styles.imgSmoke} `}
    >
      <div className="relative pt-12 my-8 w-full justify-center">
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-center flex-wrap">
          <div
            className={`h-screen flex justify-center items-center text-center bg-neutral-10 py-4 md:p-6 ${styles.box} grow-1`}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div className="text-center">
              <h2 className="md:font-headline-medium text-title-medium md:text-headline-medium text-gold font-bold mb-6">
                {lang === "es" ? bentoItems.heading.es : bentoItems.heading.default}
              </h2>
              <p className="md:font-title-large text-title-small md:text-title-large text-primary-100">
              {lang === "es" ? bentoItems.philosophy.es : bentoItems.philosophy.default}
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
              {lang === "es" ? bentoItems.team1.es : bentoItems.team1.default}{" "}
              <span className="hidden md:block">
                {lang === "es" ? bentoItems.hidden.es : bentoItems.hidden.default}
              </span>{" "}
              {lang === "es" ? bentoItems.team2.es : bentoItems.team2.default}
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
      <div className="flex gap-0 md:gap-4 pb-12 justify-center items-center px-6 md:mt-0">
        <div className="w-full md:w-[641px] md:h-[420px] md:p-0">
          <div
            className="flex flex-col justify-center items-center text-center width-[100vw] md:w-[641px] md:h-[420px] px-4 py-2 md:p-0"
            style={{
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <h2 className="md:font-headline-medium text-title-medium md:text-headline-medium text-gold font-bold mb-6">
              {lang === "es" ? bentoItems.join.title.es : bentoItems.join.title.default}
            </h2>
            <p className="md:font-title-large text-title-small md:text-title-large text-primary-100 px-2">
              {lang === "es" ? bentoItems.join.description.es : bentoItems.join.description.default}
            </p>
            <Cta className="mt-12" href={paths.positions}>
              {lang === "es" ? bentoItems.join.cta.es : bentoItems.join.cta.default}
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
