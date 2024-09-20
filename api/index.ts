import dotenv from "dotenv";
import app from "./src/App";
dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log("Hola Mundo");
});
