import { sequelize } from "./src/db";
import dotenv from "dotenv";
import app from "./src/App";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conexión a la base de datos establecida correctamente.");

      // Sincroniza los modelos con la base de datos
      sequelize
        .sync({ force: true }) // Cambia a true si quieres recrear las tablas
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
