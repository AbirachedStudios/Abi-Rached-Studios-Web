import { Model, DataTypes, Optional, ModelStatic } from "sequelize";
import { sequelize } from "../../db";
import { IUser } from "../../shared/Interface";
import bcrypt from "bcrypt";
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
  public role!: "admin" | "user";
  public password!: string; // Debería estar hasheada

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
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
    hooks: {
      // Hook que se ejecuta antes de que el usuario sea creado o actualizado
      beforeSave: async (user: User) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10); // Generar el salt para hashear la contraseña
          user.password = await bcrypt.hash(user.password, salt); // Hashear la contraseña
        }
      },
    },
  }
);
