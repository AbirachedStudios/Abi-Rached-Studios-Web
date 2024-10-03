import { Response, Request } from "express";
import { User } from "../models/Users";
import { IUser } from "../utils/Interface";
import { createUser } from "../controllers/usersControllers";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const postUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    res.status(201).json({ uid: newUser.id, name: newUser.name });
  } catch (error) {
    console.error("ERROR in createUser controller: ", error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const users = await User.findAll();
  } catch (error) {}
};
