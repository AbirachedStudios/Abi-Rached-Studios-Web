"use client";
import Breadcrumb from "@/components/commons/Breacrumbs";
import { useLanguage } from "@/context/LanguageContext";
import backgroundImg from "@/assets/img/yellow-smoke.webp";
import { Cta } from "@/components/commons/Cta";
import VideoPlayer from "@/components/commons/VideoPlayer";

export default function KitsuneHero() {
  const { lang } = useLanguage();
  const breadcrumbPaths = [
    { label: "Home", url: "/" },
    {
      label:
        lang === "es" ? "La Leyenda del Kitsune" : "The Legend of the Kitsune",
      url: null,
    },
    ,
  ];
  return (
    <div
      className="text-center w-full pt-56 pb-24 px-6 mb-12"
      style={{
        backgroundImage: `url(${backgroundImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Breadcrumb paths={breadcrumbPaths} />
      <h1 className="text-headline-large text-gold my-12">
        {lang === "es" ? "La Leyenda del Kitsune" : "The Legend of the Kitsune"}
      </h1>
      <div className="flex flex-col md:flex-row px-6 items-center gap-6">
        <div className="flex flex-col gap-6">
          <p className="text-body-large text-primary-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper suscipit vulputate. Vivamus feugiat pellentesque enim,
            vel blandit tellus viverra eget. Maecenas porttitor placerat eros
            non commodo. Nam aliquam facilisis ante eget euismod. In hac
            habitasse platea dictumst. Maecenas non.
          </p>
          <Cta className="" href="#">
            {lang === "es" ? "CONOCE MÁS" : "LEARN MORE"}
          </Cta>
        </div>
        <div>
          <iframe
            width="710"
            height="440"
            src="https://www.youtube.com/embed/S7W4DKXA3k0"
            title="Japanese Upbeat Lofi 🦊 Groovy Music with Shamisen &amp; Japanese Instruments【九尾狐 - Kitsune】"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* <VideoPlayer id="S7W4DKXA3k0" width={744} height={417} /> */}
      </div>
    </div>
  );
}
