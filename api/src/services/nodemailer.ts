import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
import { Template } from "./Template";

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type EmailAction = "USER_CREATED" | "PASSWORD_RECOVERY" | "USER_DELETED";

/**
 * Obtiene la plantilla de correo electrónico según el tipo de acción
 * @param action - Tipo de acción que determina la plantilla ('USER_CREATED', 'PASSWORD_RECOVERY', 'USER_DELETED')
 * @param name - Nombre del usuario destinatario
 * @param token - Token opcional para recuperación de contraseña
 * @returns Objeto con el asunto y contenido HTML del correo
 */
const getEmailTemplate = (
  action: EmailAction,
  name: string,
  token?: string
): { subject: string; html: string } => {
  switch (action) {
    case "USER_CREATED":
      return Template.userCreatedTemplate(name);
    case "PASSWORD_RECOVERY":
      return Template.passwordRecoveryTemplate(name, token!);
      case "USER_DELETED":
      return Template.userDeletedTemplate(name);
    default:
      return {
        subject: "Notificación del sistema",
        html: `<p>Hola ${name}, esta es una notificación de nuestro sistema.</p>`,
      };
  }
};

/**
 * Envía un correo electrónico utilizando la configuración SMTP establecida
 * @param to - Dirección de correo electrónico del destinatario
 * @param action - Tipo de acción que determina la plantilla
 * @param name - Nombre del usuario destinatario
 * @param token - Token opcional para recuperación de contraseña
 */
export const sendEmail = async (
  to: string,
  action: EmailAction,
  name: string,
  token?: string
) => {
  const { subject, html } = getEmailTemplate(action, name, token);
  try {
    const info = await transporter.sendMail({
      from: `"Soporte" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar email:", error);
  }
};
