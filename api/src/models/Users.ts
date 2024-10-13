import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db";
import { IUser } from "../utils/Interface";
import { UUID } from "crypto";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

// Extendemos la clase `Model` para tipar correctamente las propiedades del modelo
export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public id!: UUID; // `!` significa que la propiedad está garantizada después de la creación
  public name!: string;
  public email!: string;
  public password!: string; // Debería estar hasheada

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      validate: {
        isEmail: true, // Agregar validación para asegurar que el email sea correcto
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true, // Sequelize crea automáticamente `createdAt` y `updatedAt`
  }
);
