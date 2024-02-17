"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schema/auth";
import bcrypt from "bcryptjs";
import { getUserByUsername, createUser } from "@/repository/UserRepo";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Las entradas de formulario no son válidas" };
  }

  const { username, password, nombre } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return { error: "El nombre de usuario ya está en uso" };
  }

  const createdUser = createUser({
    nombre,
    username,
    password: hashedPassword,
  });

  if (!createdUser) return { error: "No se pudo crear el usuario" };

  return { success: "Registrado correctamente" };
};
