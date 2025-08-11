import { sequelize } from "./src/db";
import dotenv from "dotenv";
import app from "./src/App";

/**
 * Configuración inicial de variables de entorno
 */
dotenv.config();

/**
 * Puerto en el que se ejecutará el servidor
 * Se obtiene de las variables de entorno o usa 3001 como valor predeterminado
 */
const PORT = process.env.PORT || 3001;

/**
 * Inicialización del servidor Express
 * 1. Establece la conexión con la base de datos
 * 2. Sincroniza los modelos con la base de datos
 * 3. Inicia el servidor HTTP
 */
app.listen(PORT, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conexión a la base de datos establecida correctamente.");

      /**
       * Sincronización de modelos con la base de datos
       * @param {Object} options - Opciones de sincronización
       * @param {boolean} options.force - Si es true, elimina y recrea todas las tablas
       */
      sequelize
        .sync({ force: true }) // NOTA: force:true eliminará y recreará todas las tablas
        .then(() => {
          console.log("Modelos sincronizados correctamente.");
        })
        .catch((error) => {
          console.error("Error al sincronizar los modelos:", error);
        });
    })
    .catch((error: any) => {
      console.error("No se pudo conectar a la base de datos:", error);
    });
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
