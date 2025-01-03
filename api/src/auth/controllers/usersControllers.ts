import { IUser } from "../../shared/Interface";
import { User } from "../model/Users";

import { sendEmail } from "../../services/nodemailer";
import jwt from 'jsonwebtoken';

export const createUser = async (user: IUser) => {
  try {
    const { name, email, password } = user;
    if (!name.includes(" ") && name.length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }
    if (!email.includes("@")) {
      throw new Error("El email debe ser válido");
    }
    if (password.length < 8 || password.length > 16) {
      throw new Error("La contraseña debe tener entre 8 y 16 caracteres");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
      );
    }
    const newUser = await User.create({ name, email, password, role: "user" });
    await sendEmail(email, "USER_CREATED", name);
    return newUser;
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

export const getAllUser = async (page: number = 1, limit: number = 10, filters?: {
  role?: string;
  email?: string;
  name?: string;
}) => {
  try {
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (filters) {
      if (filters.role) whereClause.role = filters.role;
      if (filters.email) whereClause.email = filters.email;
      if (filters.name) whereClause.name = filters.name;
    }

    const total = await User.count({ where: whereClause });

    const users = await User.findAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      users,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error("ERROR getAllUser controllers: ", error);
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

export const recoverPassword = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Crear token de recuperación (expira en 1 hora)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    // Enviar email con el token
    await sendEmail(
      email,
      "PASSWORD_RECOVERY",
      user.name,
      token
    );

    return { message: "Email de recuperación enviado" };
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar contraseña
    await user.update({ password: newPassword });
    
    return { message: "Contraseña actualizada correctamente" };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("El enlace ha expirado");
    }
    throw new Error("Error al restablecer la contraseña");
  }
};
