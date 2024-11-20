import type { User as NextAuthUserType } from "next-auth";

export const addUserAuthentication = async ({
	user,
}: {
	user: NextAuthUserType;
}) => {
	try {
		const res = await fetch("http://localhost:3000/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: user.name,
				email: user.email,
			}),
		});

		return res;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error while creating user", error.message);
		}
	}
};
