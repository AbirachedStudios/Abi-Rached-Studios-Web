import { Response, Request } from "express";
import { User } from "../models/Users";
import { IUser } from "../utils/Interface";
import {
  createUser,
  updateUser,
  getAllUser,
  searchUserByName,
  getUserByIdController,
} from "../controllers/usersControllers";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const postUserHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  try {
    let noRepeat = await User.findOne({
      where: {
        email: email,
      },
    });
    if (noRepeat) {
      res.status(400).send("ya se registro un usuario con el mismo mail");
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user: IUser = {
      ...req.body,
      password: hashedPassword,
    };

    const newUser = await createUser(user);
    res.status(201).json({
      uid: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.error("ERROR in createUser controller: ", error);
    throw error;
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const user = await updateUser({ id: String(id), updatedData });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const results = name
      ? await searchUserByName(name as string)
      : await getAllUser();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdController(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("ERROR in getUserById handler: ", error);
    return res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let forDelete = await User.findByPk(id);
    if (id && forDelete) {
      await User.destroy({
        where: {
          id: id,
        },
      });
    }
    res.status(201).json("Borrado exitosamente");
  } catch (error) {
    res.status(400).json({
      error: "No se recibieron los parámetros necesarios para borrar el Post",
    });
  }
};
