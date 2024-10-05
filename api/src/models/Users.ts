import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";
import { IUser } from "../utils/Interface";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

// Extendemos la clase `Model` para tipar correctamente las propiedades del modelo
export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number; // `!` significa que la propiedad está garantizada después de la creación
  public name!: string;
  public email!: string;
  public password!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // La instancia de Sequelize
    tableName: "usuarios",
    timestamps: true,
  }
);