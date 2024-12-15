import NextAuth, { getServerSession, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
  }
}

// PrismaClient oluştur
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // PrismaClient örneğini buraya aktarıyoruz
  session: {
    strategy: "jwt", // Düzeltildi
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token?.isAdmin) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      if (token?.email) {
        const userInDB = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        token.isAdmin = userInDB?.isAdmin ?? false; // Güvenli bir şekilde varsayılan değer döndür
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

// Sunucu oturumunu almak için kullan
export const getAuthSession = () => getServerSession(authOptions);