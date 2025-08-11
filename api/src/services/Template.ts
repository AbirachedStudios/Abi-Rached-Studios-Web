export const Template = {
  /**
   * Genera la plantilla de correo para usuarios recién creados
   * @param name - Nombre del usuario
   * @returns Objeto con el asunto y contenido HTML del correo
   */
  userCreatedTemplate: (name: string): { subject: string; html: string } => ({
    subject: "Bienvenido a nuestra plataforma",
    html: `
          <div style="background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRppkrVEnasAubeZj68xgW2UcwGVjz3TQm2tA&s') no-repeat center center; background-size: cover; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 8px;">
              <h1 style="text-align: center; color: #4CAF50;">¡Bienvenido, ${name}!</h1>
              <p style="font-size: 16px; text-align: center;">
                Tu cuenta ha sido creada exitosamente. Nos alegra tenerte con nosotros.
              </p>
              <img src="https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png" alt="Logo" style="display: block; margin: 20px auto; width: 150px;">
              <p style="font-size: 14px; text-align: center; color: #777;">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
            </div>
          </div>
        `,
  }),

  /**
   * Genera la plantilla de correo para usuarios eliminados
   * @param name - Nombre del usuario
   * @returns Objeto con el asunto y contenido HTML del correo
   */
  userDeletedTemplate: (name: string): { subject: string; html: string } => ({
    subject: "Tu cuenta ha sido eliminada",
    html: `
      <div style="background-color: #f8d7da; padding: 20px; color: #721c24;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #f5c6cb;">
          <h1 style="text-align: center; color: #721c24;">Cuenta eliminada</h1>
          <p style="font-size: 16px; text-align: center;">
            Hola ${name}, lamentamos informarte que tu cuenta ha sido eliminada. Si fue un error, contáctanos para solucionar el problema.
          </p>
        </div>
      </div>
    `,
  }),

  /**
   * Genera la plantilla de correo para recuperación de contraseña
   * @param name - Nombre del usuario
   * @param token - Token de recuperación
   * @returns Objeto con el asunto y contenido HTML del correo
   */
  passwordRecoveryTemplate: (name: string, token: string) => ({
    subject: "Recuperación de contraseña",
    html: `
      <h1>Hola ${name}</h1>
      <p>Has solicitado recuperar tu contraseña. Haz click en el siguiente enlace para restablecerla:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
      <p>El enlace expirará en 1 hora.</p>
    `
  }),
};
