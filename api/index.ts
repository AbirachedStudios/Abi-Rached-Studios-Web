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
    })
    .catch((error: any) => {
      console.error("No se pudo conectar a la base de datos:", error);
    });
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log("Hola Mundo");
});
