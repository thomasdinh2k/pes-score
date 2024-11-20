import User from "@/app/models/user";
import { addUserAuthentication } from "@/app/services/auth.service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectMongoDB from "../../../../../lib/mongodb";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				try {
					await connectMongoDB();

					const isUserExists = await User.findOne({
						email: user.email,
					});

					if (isUserExists) {
						console.info(
							`User ${user.email} already exists in database`
						);
						return user; // Early return call
					}

					const res = await addUserAuthentication({
						user,
					});

					if (res?.ok) {
						return user;
					}
				} catch (error) {
					if (error instanceof Error) {
						console.error(
							"Error while creating user",
							error.message
						);
					}
				}
			}

			return user;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
