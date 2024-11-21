import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../models/user";

export async function POST(req) {
	const { name, email } = await req.json();
	await connectMongoDB();
	try {
		await User.create({
			name,
			email,
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to create user",
				error: error.message,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json({
		status: 201,
		success: true,
		message: "User Created",
	});
}
