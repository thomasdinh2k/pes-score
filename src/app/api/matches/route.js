import connectMongoDB from "../../../../lib/mongodb";
import Match from "../../../../models/match";
import { NextResponse } from "next/server";

export async function DELETE () {
	await connectMongoDB();
	await Match.deleteMany({});

	return NextResponse.json({success: true, message: "All matches deleted, Database Cleared!"});
}
