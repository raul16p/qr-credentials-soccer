import NextAuth, { User } from "next-auth";
import {} from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string;
    nombre: string;
    isAdmin: boolean;
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
