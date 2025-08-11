import { Response, Request } from "express";
import { User } from "../model/Users";
import { IUser } from "../../shared/Interface";
import {
  createUser,
  updateUser,
  getAllUser,
  searchUserByName,
  getUserByIdController,
  recoverPassword,
  resetPassword,
  softDeleteUser,
  restoreUser,
} from "../controllers/usersControllers";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

/**
 * Maneja la creación de nuevos usuarios
 * @param req - Request con los datos del usuario en el body
 * @param res - Response para enviar la respuesta
 */
export const postUserHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as IUser;
  try {
    // Verificar si el email ya está registrado
    let noRepeat = await User.findOne({
      where: { email },
    });
    if (noRepeat) {
      return res.status(400).send("El correo ya está registrado.");
    }

    // Crear un nuevo usuario, el hook de Sequelize se encargará de hashear la contraseña

    const user: IUser = {
      ...req.body,
    };
    const newUser = await createUser(user);

    res.status(201).json({
      uid: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error en postUserHandler: ", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Maneja la actualización de usuarios
 * @param req - Request con ID en params y datos a actualizar en body
 * @param res - Response para enviar la respuesta
 */
export const updateUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body; // Puede incluir la contraseña sin necesidad de hashearla manualmente

  try {
    // Buscar al usuario por su ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar el usuario, el hook se encargará del hasheo si la contraseña ha cambiado
    await updateUser({ id: String(id), updatedData });

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Maneja la obtención de todos los usuarios
 * @param req - Request
 * @param res - Response para enviar la lista de usuarios
 */
export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const results = await getAllUser();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).send(error);
  }
};

/**
 * Maneja la obtención de un usuario por ID
 * @param req - Request con ID en params
 * @param res - Response para enviar el usuario
 */
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

/**
 * Maneja el borrado suave de usuarios
 * @param req - Request con ID en params
 * @param res - Response para enviar confirmación
 */
export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await softDeleteUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || "No se pudo desactivar el usuario",
    });
  }
};

/**
 * Maneja la solicitud de recuperación de contraseña
 * @param req - Request con email en body
 * @param res - Response para enviar confirmación
 */
export const recoverPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "El email es requerido" });
    }

    const result = await recoverPassword(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja el restablecimiento de contraseña
 * @param req - Request con token y nueva contraseña en body
 * @param res - Response para enviar confirmación
 */
export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token y nueva contraseña son requeridos" });
    }

    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Maneja la restauración de usuarios desactivados
 * @param req - Request con ID en params
 * @param res - Response para enviar confirmación
 */
export const restoreUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await restoreUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || "No se pudo restaurar el usuario",
    });
  }
};
