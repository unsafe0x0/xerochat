import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbClient from "@/prisma/DbClient";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const googleId = profile?.sub || user.id;

        const dbUser = await dbClient.user.findUnique({
          where: { googleId },
        });

        if (!dbUser) {
          await dbClient.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              image: user.image || "",
              googleId,
            },
          });
        }
      }
      return true;
    },

    async jwt({ token }) {
      const dbUser = await dbClient.user.findUnique({
        where: { email: token.email as string },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.image = dbUser.image;
        token.googleId = dbUser.googleId;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.googleId = token.googleId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
