import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.usuario.findUnique({ where: { username } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await db.usuario.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const createUser = async (data: Prisma.UsuarioCreateInput) => {
  try {
    const createdUser = await db.usuario.create({
      data,
    });
    return createdUser;
  } catch (error) {
    return null;
  }
};
