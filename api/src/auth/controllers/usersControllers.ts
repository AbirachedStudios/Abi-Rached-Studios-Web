import { IUser } from "../../shared/Interface";
import { User } from "../model/Users";

import { sendEmail } from "../../services/nodemailer";
import jwt from 'jsonwebtoken';

/**
 * Crea un nuevo usuario en el sistema
 * @param user - Datos del usuario a crear (nombre, email, contraseña)
 * @returns El usuario creado
 * @throws Error si los datos no cumplen con las validaciones
 */
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

/**
 * Actualiza los datos de un usuario existente
 * @param id - ID del usuario a actualizar
 * @param updatedData - Datos parciales del usuario a actualizar
 * @returns Usuario actualizado o null si no se encuentra
 * @throws Error si hay problemas con la actualización
 */
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

/**
 * Obtiene todos los usuarios con paginación y filtros
 * @param page - Número de página actual (default: 1)
 * @param limit - Cantidad de usuarios por página (default: 10)
 * @param filters - Filtros opcionales (rol, email, nombre)
 * @returns Objeto con usuarios y metadata de paginación
 */
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

/**
 * Busca usuarios por nombre
 * @param name - Nombre del usuario a buscar
 * @returns Array de usuarios que coinciden con el nombre
 * @throws Error si hay problemas en la búsqueda
 */
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

/**
 * Obtiene un usuario por su ID
 * @param id - ID del usuario a buscar
 * @returns Usuario encontrado o mensaje de error
 */
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

/**
 * Inicia el proceso de recuperación de contraseña
 * @param email - Email del usuario que solicita recuperar su contraseña
 * @returns Mensaje de confirmación
 * @throws Error si el usuario no existe o hay problemas en el proceso
 */
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

/**
 * Restablece la contraseña de un usuario
 * @param token - Token de recuperación válido
 * @param newPassword - Nueva contraseña
 * @returns Mensaje de confirmación
 * @throws Error si el token es inválido o ha expirado
 */
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

/**
 * Realiza un borrado suave de un usuario
 * @param id - ID del usuario a desactivar
 * @returns Mensaje de confirmación
 * @throws Error si el usuario no existe o hay problemas en el proceso
 */
export const softDeleteUser = async (id: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Soft delete del usuario
    await user.destroy(); // Con paranoid: true, esto realiza un soft delete

    // Enviar email de notificación
    await sendEmail(user.email, "USER_DELETED", user.name);

    return { message: "Usuario desactivado exitosamente" };
  } catch (error) {
    console.error("ERROR softDeleteUser controllers: ", error);
    throw error;
  }
};

/**
 * Restaura un usuario previamente desactivado
 * @param id - ID del usuario a restaurar
 * @returns Mensaje de confirmación
 * @throws Error si el usuario no existe o hay problemas en el proceso
 */
export const restoreUser = async (id: string) => {
  try {
    const user = await User.findByPk(id, { paranoid: false }); // Incluye registros "eliminados"
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await user.restore(); // Restaura el usuario
    return { message: "Usuario restaurado exitosamente" };
  } catch (error) {
    console.error("ERROR restoreUser controllers: ", error);
    throw error;
  }
};
