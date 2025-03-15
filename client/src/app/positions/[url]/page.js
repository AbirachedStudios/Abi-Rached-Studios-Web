"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { positionsItems } from "@/data/positions/positionsItems";
import Breadcrumb from "@/components/commons/Breacrumbs";
import { Cta } from "@/components/commons/Cta";
import ConfirmationModal from "@/components/commons/ConfirmationModal";
import backgroundImg from "@/assets/img/bg-blue.png";

const normalizeTitleForUrl = (title) => {
  return title.toLowerCase().replace(/ /g, "-");
};

const PositionDetails = () => {
  const { url } = useParams();
  const { lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const position = positionsItems.find(
    (item) => normalizeTitleForUrl(item.title.default) === url
  );

  if (!position) {
    return (
      <div className="text-white pt-[200px]">
        <h1 className="text-display-large">Position not found</h1>
        <p>We couldn't find the position you're looking for.</p>
      </div>
    );
  }

  const breadcrumbPaths = [
    { label: "Home", url: "/" },
    { label: "Positions", url: "/positions" },
    { label: position.title.default, url: null },
  ];

  // Función para manejar el click y abrir el modal
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="text-primary-100 pt-[200px] px-6"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url(${backgroundImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Breadcrumb paths={breadcrumbPaths} />
      <div>
        <div
          className="text-center bg-neutral-10 py-12 mt-8 rounded-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <h1 className="text-headline-large text-gold">
            {lang === "es" ? position.title.es : position.title.default}
          </h1>
          <span className="text-headline-small text-primary-100">
            {lang === "es" ? position.game.es : position.game.default}
          </span>
        </div>

        <div className="mt-4 mb-16 flex flex-col md:flex-row gap-6">
          <div className="flex-1 rounded-md p-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
            <h2 className="text-headline-small text-center mb-2">
              {lang === "es" ? "Responsabilidades" : "Responsibilities"}
            </h2>
            <p className="text-title-small mt-8">
              {lang === "es" ? position.info.es : position.info.default}
            </p>
          </div>

          <div className="mt-6 p-6 md:mt-0 flex-1 rounded-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
            <h2 className="text-headline-small text-center mb-2">
              {lang === "es" ? "Requerimientos" : "Requirements"}
            </h2>
            <ul className="list-disc text-title-small pl-5 mt-8">
              {position.requirements.map((req, index) => (
                <li key={index}>{lang === "es" ? req.es : req.default}</li>
              ))}
            </ul>
          </div>

          <div className="flex-1 rounded-md p-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
            <h2 className="text-headline-small text-center mb-2">
              {lang === "es" ? "Postulate acá" : "Apply here"}
            </h2>

            <div className="flex flex-col w-full mt-8">
              <label className="text-primary-100 text-title-small mb-2">
                {lang === "es" ? "Carga tu CV" : "Upload your resume"}{" "}
                <span className="text-error-50">*</span>
              </label>
              <div className="relative flex w-full h-[50px] rounded-md overflow-hidden border-2 border-primary-60">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute top-0 right-0 w-[50px] h-full bg-primary-60 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-upload"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full mt-4">
              <label className="text-primary-100 mb-2 text-title-small">
                {lang === "es" ? "Sitio Web (opcional)" : "Website (optional)"}{" "}
              </label>
              <input
                type="text"
                className="border-2 rounded-md p-2 w-full h-[50px] text-primary-100 transition-all duration-500 focus:outline-4 border-primary-60"
                style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              />
            </div>

            {/* Botón que abre el modal */}
            <Cta className="text-black text-center w-full mt-6" onClick={handleApplyClick}>
              {lang === "es" ? "POSTULARME" : "APPLY"}
            </Cta>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ConfirmationModal
          title={lang === "es" ? "Postulación enviada" : "Application Submitted"}
          message={
            lang === "es"
              ? "Tu postulación ha sido enviada correctamente."
              : "Your application has been successfully submitted."
          }
          onClose={() => setIsModalOpen(false)} 
          closeText={lang === "es" ? "Cerrar" : "Close"}
        />
      )}
    </div>
  );
};

export default PositionDetails;
