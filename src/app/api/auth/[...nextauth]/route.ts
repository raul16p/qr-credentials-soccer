import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    nombre: string;
    isAdmin: boolean;
  }
  interface Session {
    user?: User;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Nombre de usuario",
          type: "text",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.username || !credentials.password)
          throw new Error("No se proporcionaron credenciales completas");

        const userFound = await db.usuario.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!userFound) throw new Error("No se encontró el usuario");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Contraseña incorrecta");

        return {
          id: userFound.id,
          username: userFound.username,
          isAdmin: userFound.is_admin,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    //@ts-ignore
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
