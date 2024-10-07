import { IUser } from "../utils/Interface";
import { User } from "../models/Users";

export const createUser = async (user: IUser) => {
  try {
    const { name, email, password } = user;
    return await User.create({ name, email, password });
  } catch (error) {
    console.error("ERROR createdUser controllers : ", error);
    throw error;
  }
};
