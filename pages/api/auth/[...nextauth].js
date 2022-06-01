import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import User from "../../../lib/models/User";
import { connectDB } from "../../../lib/utils/db";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				connectDB();
				const { email, password } = credentials;
				const user = await User.findOne({ email });

				if (!user) return null;

				if (!bcrypt.compareSync(password, user.password)) return null;

				delete user._doc.password;

				return user._doc;
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				return { ...token, ...user };
			} else {
				return token;
			}
		},
		session: ({ session, token }) => {
			if (token) {
				return { ...session, ...token };
			} else {
				return session;
			}
		},
	},
	secret: "7635e4eb835c6f8130f8a4e05859f368a4b2d7384af94c2e54be1d9d58b61132ab980d780964e00b4b4fed8a03678f2326838361d0a5082daaad76885fb85afc",
	jwt: {
		secret: "7635e4eb835c6f8130f8a4e05859f368a4b2d7384af94c2e54be1d9d58b61132ab980d780964e00b4b4fed8a03678f2326838361d0a5082daaad76885fb85afc",
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signin: "/",
	},
});
