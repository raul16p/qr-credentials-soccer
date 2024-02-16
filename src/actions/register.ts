"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import db from "@/lib/db";
import { RegisterSchema } from "@/schema/auth";
import { getUserByUsername } from "@/services/UserService";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { username, password, nombre } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return { error: "El nombre de usuario ya está en uso!" };
  }

  await db.usuario.create({
    data: {
      nombre,
      username,
      password: hashedPassword,
    },
  });

  return { success: "Registrado correctamente!" };
};
