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
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      if (session && token.user) Object.assign(session.user, token.user);

      return session;
    },
  },
  ...authConfig,
});
