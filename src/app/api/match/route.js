import connectMongoDB from "../../../../lib/mongodb";
import Match from "../../../../models/match";
import { NextResponse } from "next/server";

export async function POST(req) {
	const {
		match_number,
		date,
		time,
		home_player,
		home_team,
		home_score,
		away_player,
		away_team,
		away_score,
	} = await req.json();
	await connectMongoDB();

	try {
		await Match.create({
			match_number,
			date,
			time,
			home_player,
			home_team,
			home_score,
			away_player,
			away_team,
			away_score,
		});

		return NextResponse.json({
			success: true,
			message: "Match Created",
			match: {
				match_number,
				date,
				time,
				home_player,
				home_team,
				home_score,
				away_player,
				away_team,
				away_score,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to create match",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
    await connectMongoDB();
    const matches = await Match.find();
    return NextResponse.json({success: true, matches});
}