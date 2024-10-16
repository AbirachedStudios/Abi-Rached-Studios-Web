"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { paths } from "@/data/paths";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Puedes hacer un fetch o enviar los datos a tu API aquí
  };

  return (
    <div className="px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between items-start p-6"
      >
        <div className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-primary-100 mb-2">
              Email <span className="text-error-50">*</span>
            </label>
            <input
              {...register("email", { required: true })}
              className={`border-2 rounded-md p-2 w-[583px] h-[60px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.email
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
              placeholder="email@mail.com"
            />
            {errors.email && (
              <span className="text-error-50">Email es requerido</span>
            )}
          </div>

          {/* Gamer ID */}
          <div className="flex flex-col">
            <label className="text-primary-100 mb-2">
              Gamer ID <span className="text-error-50">*</span>
            </label>
            <input
              {...register("gamerId", { required: true })}
              className={`border-2 rounded-md p-2 w-[583px] h-[60px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.gamerId
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
              placeholder="XXXXXXXX"
            />
            {errors.gamerId && (
              <span className="text-error-50">Gamer ID es requerido</span>
            )}
          </div>

          {/* Motivo de contacto */}
          <div className="flex flex-col relative">
            <label className="text-primary-100 mb-2">
              Motivo de contacto <span className="text-error-50">*</span>
            </label>
            <div className="relative w-[583px] h-[60px]">
              <select
                {...register("motivo", { required: true })}
                className={`border-2 rounded-md p-2 w-full h-full bg-primary-0 text-primary-100 appearance-none transition-all duration-500 ${
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
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-6 h-6 text-primary-60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            {errors.motivo && (
              <span className="text-error-50">Este campo es requerido</span>
            )}
          </div>

          {/* Términos y condiciones */}
          <div>
            <div className="flex items-center mb-2">
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
          <div>
            <input
              type="checkbox"
              {...register("novedades")}
              className="form-checkbox h-4 w-4 color-primary-60 border-gray-300 rounded checked:ring-primary-60"
              
            />
            <label className="text-primary-100 ml-2">
              Quiero recibir novedades por mail
            </label>
          </div>

          {/* Botón de enviar */}
          <button type="submit" className="bg-yellow-500 rounded-md p-2">
            Enviar
          </button>
        </div>

        <div>
          {/* Comentarios */}
          <div className="flex flex-col">
            <label className="text-primary-100 mb-2">
              Dejanos tus comentarios <span className="text-error-50">*</span>
            </label>
            <textarea
              {...register("comentarios", { required: true })}
              className={`border-2 rounded-md p-2 w-[583px] h-[381px] bg-primary-0 text-primary-100 transition-all duration-500 ${
                errors.comentarios
                  ? "border-error-50 focus:outline-error-50"
                  : "border-primary-60 focus:outline-primary-80"
              } focus:outline-4`}
            />
            {errors.comentarios && (
              <span className="text-error-50">Comentarios son requeridos</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
