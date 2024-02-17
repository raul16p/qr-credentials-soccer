import { getUserByUsername } from "@/repository/UserRepo";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schema/auth";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const userFound = await getUserByUsername(username);

          if (!userFound) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            userFound.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return {
            username: userFound.username,
            isAdmin: userFound.is_admin,
            nombre: userFound.nombre,
          };
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
