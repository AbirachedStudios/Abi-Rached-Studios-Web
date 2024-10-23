import { IUser } from "../../utils/Interface";
import { User } from "../model/Users";

export const createUser = async (user: IUser) => {
  try {
    const { name, email, password } = user;
    return await User.create({ name, email, password });
  } catch (error) {
    console.error("ERROR createdUser controllers: ", error);
    throw error;
  }
};

export const updateUser = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: Partial<IUser>;
}) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      console.log(`No user found with id ${id}`);
      return null;
    }

    const { email } = updatedData;
    if (email) {
      const existingUserByEmail = await User.findOne({ where: { email } });
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new Error("There is already a user with the same email");
      }
    }

    const updatedUser = await user.update(updatedData);
    return updatedUser;
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("ERROR createdUser controllers: ", error);
    throw error;
  }
};

export const searchUserByName = async (name: string) => {
  try {
    const infoDB = await User.findAll({
      where: { name: name },
    });
    if (infoDB === null) {
      console.log(`No se encontró al usuario con el nombre: ${name}`);
    }
    return infoDB;
  } catch (err) {
    console.log(err);
    throw new Error(
      `Error controllers, Fallo al encontrar al usuario: ${name}`
    );
  }
};

export const getUserByIdController = async (id: string) => {
  try {
    let user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return { error: true, message: `User with ID ${id} not found` };
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error(`Error controllers, Fallo al encontrar al usuario: ${id}`);
  }
};
