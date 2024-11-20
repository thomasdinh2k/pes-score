export type AuthUser = {
	id: string;
	name: string;
	email: string;
	image: string;
};

export type AuthAccount = {
	provider: string;
	type: string;
	providerAccountId: string;
	access_token: string;
	expires_at: number;
	scope: string;
	token_type: string;
	id_token: string;
	session_state: string;
	token: string;
	user: AuthUser;
};

export const addUserAuthentication = async ({ user }: { user: AuthUser }) => {
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
