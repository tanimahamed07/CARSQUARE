import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCollection = await dbConnect("users");

        const user = await userCollection.findOne({
          email: credentials.email,
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          fullName: user.name,
          email: user.email,
          role: user.role,
          image: user.image || null,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const userCollection = await dbConnect("users");

        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await userCollection.insertOne({
            provider: "google",
            fullName: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            nidNumber: "Not Provided",
            contact: "Not Provided",
            createdAt: new Date(),
          });

          user.role = "user";
        } else {
          user.role = existingUser.role;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        return token;
      }

      const userCollection = await dbConnect("users");
      const dbUser = await userCollection.findOne({
        email: token.email,
      });

      if (dbUser) {
        token.role = dbUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role || "user";
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
