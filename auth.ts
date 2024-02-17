import NextAuth from "next-auth";
import authConfig from "./config/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      //TODO: Refactor by using spread operator
      if (session && token.user) {
        session.user.username = token.user.username;
        session.user.nombre = token.user.nombre;
        session.user.isAdmin = token.user.isAdmin;
      }

      return session;
    },
  },
  ...authConfig,
});
