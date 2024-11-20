import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// ...add more providers here
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
