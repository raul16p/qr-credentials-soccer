import db from "@/lib/db";

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
