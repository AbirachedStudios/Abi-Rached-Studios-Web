import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/abirached`,
  {
    logging: false, // Cambia esto a `true` si quieres ver las consultas
    native: false,
  }
);

// Definición de relaciones
