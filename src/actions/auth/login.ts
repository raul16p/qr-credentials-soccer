"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "auth";
import { LoginSchema } from "@/schema/auth";
import { DEFAULT_LOGIN_REDIRECT } from "config/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Las entradas de formulario no son válidas" };
  }

  const { username, password } = validatedFields.data;

  try {
    const url = await signIn("credentials", {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });
    return { url };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales incorrectas" };
        default:
          return { error: "Hubo un error de servidor" };
      }
    }
    throw error;
  }
};
