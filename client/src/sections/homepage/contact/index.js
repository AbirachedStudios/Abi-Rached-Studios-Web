"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { paths } from "@/data/paths";
import { Cta } from "@/components/commons/Cta";
import { contactItems, selectOptions } from "@/data/contactItems";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="px-6 my-12">
      <h2 className="text-headline-small md:text-display-small text-gold text-center mb-6 md:mb-0">
        {lang === "es" ? contactItems.heading.es : contactItems.heading.default}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-between items-start p-0 md:p-6"
      >
        <div className="flex flex-col gap-6 w-[380px] md:w-[583px]">
          {/* Email */}
          <div className="flex flex-col w-[380px] md:w-[583px]">
            <label className="text-primary-100 mb-2">
              Email <span className="text-error-50">*</span>
            </label>
            <input
              {...register("email", { required: true })}
              className={`border-2 rounded-md p-2 w-[380px] md:w-[583px] h-[50px] md:h-[60px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.email
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
              placeholder="email@mail.com"
            />
            {errors.email && (
              <span className="text-error-50 w-[100vw] md:w-[583px] h-[50px] md:h-[60px]">Email es requerido</span>
            )}
          </div>

          {/* Gamer ID */}
          <div className="flex flex-col">
            <label className="text-primary-100 mb-2">
              Gamer ID <span className="text-error-50">*</span>
            </label>
            <input
              {...register("gamerId", { required: true })}
              className={`border-2 rounded-md p-2 w-[380px] md:w-[583px] h-[50px] md:h-[60px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.gamerId
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
              placeholder="XXXXXXXX"
            />
            {errors.gamerId && (
              <span className="text-error-50 w-[380px] md:w-[583px] h-[50px] md:h-[60px]">Gamer ID es requerido</span>
            )}
          </div>

          {/* Motivo de contacto */}
          <div className="flex flex-col relative">
            <label className="text-primary-100 mb-2">
              Motivo de contacto <span className="text-error-50">*</span>
            </label>
            <div className="relative w-[380px] md:w-[583px] h-[50px] md:h-[60px]">
              <select
                {...register("motivo", { required: true })}
                className={`border-2 rounded-md p-2 w-[380px] md:w-[583px] h-[50px] md:h-[60px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                  errors.motivo
                    ? "border-error-50 focus:outline-error-50"
                    : "border-primary-60 focus:outline-primary-80"
                } focus:outline-4`}
              >
                <option value="">Seleccioná un motivo</option>
                <option value="soporte">Soporte</option>
                <option value="consulta">Consulta</option>
              </select>
              {/* Custom Arrow */}
            </div>
            {errors.motivo && (
              <span className="text-error-50 w-[380px] md:w-[583px] h-[50px] md:h-[60px]">Este campo es requerido</span>
            )}
          </div>

          {/* Términos y condiciones */}
          <div>
            <div className="hidden md:flex items-center mb-2">
              <input
                type="checkbox"
                {...register("terminos", { required: true })}
                className="form-checkbox h-4 w-4 color-primary-60 border-gray-300 rounded focus:ring-primary-60"
              />
              <label className="text-primary-100 ml-2">
                Acepto los{" "}
                <Link href={paths.terms} className="text-gold underline">
                  términos y condiciones
                </Link>{" "}
                <span className="text-error-50">*</span>
              </label>
              {errors.terminos && (
                <span className="text-error-50 ml-2">
                  Debes aceptar los términos y condiciones
                </span>
              )}
            </div>
          </div>

          {/* Checkbox para novedades por mail */}
          <div className="hidden md:block">
            <input
              type="checkbox"
              {...register("novedades")}
              className="form-checkbox h-4 w-4 color-primary-60 border-gray-300 rounded checked:ring-primary-60 "
            />
            <label className="text-primary-100 ml-2">
              Quiero recibir novedades por mail
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          {/* Comentarios */}
          <div className="flex flex-col">
            <label className="text-primary-100 mb-2 w-[380px] md:w-[583px] ">
              Dejanos tus comentarios <span className="text-error-50">*</span>
            </label>
            <textarea
              {...register("comentarios", { required: true })}
              className={`border-2 rounded-md p-2 w-[380px] md:w-[583px] h-[150px] md:h-[381px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.comentarios
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
            />
            {errors.comentarios && (
              <span className="text-error-50">Comentarios son requeridos</span>
            )}
          </div>
          <div className="block md:hidden my-2">
            <input
              type="checkbox"
              {...register("novedades")}
              className="form-checkbox h-4 w-4 color-primary-60 border-gray-300 rounded checked:ring-primary-60 "
            />
            <label className="text-primary-100 ml-2">
              Quiero recibir novedades por mail
            </label>
          </div>
          <span className="text-primary-100 block md:hidden">Al enviar estas aceptando nuestros <Link href="#" className="text-primary-60">Términos y condiciones</Link> </span>
          {/* Botón de enviar */}
          <Cta type="submit" className="bg-gold text-title-large rounded-md p-2 w-[260px]">
            Enviar
          </Cta>
        </div>
      </form>
    </div>
  );
}
