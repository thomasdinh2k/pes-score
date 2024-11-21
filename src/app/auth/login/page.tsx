"use client";

import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Login = (props: Props) => {
	const { status, data: session } = useSession();

	if (status === "authenticated") {
		console.log("session", session);

		return (
			<>
				<h1>Authenticated</h1>
				<Image
					src={session?.user?.image as string}
					width={500}
					height={500}
					alt="Profile Picture"
				/>
				<Button onClick={() => signOut()}>Logout</Button>
			</>
		);
	}

	return (
		<Button
			onClick={() => {
				signIn("google");
			}}
		>
			Login
		</Button>
	);
};

export default Login;
