import connectMongoDB from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Match from "../../../../../models/match";

export async function PUT(req, { params }) {
	// console.log(params)
	const { id } = await params;
	console.log("🪳 ~ file: route.js:7 ~ PUT ~ id||", id);

	const {
		newMatchNumber: match_number,
		newDate: date,
		newTime: time,
		newHomePlayer: home_player,
		newHomeTeam: home_team,
		newHomeScore: home_score,
		newAwayPlayer: away_player,
		newAwayTeam: away_team,
		newAwayScore: away_score,
	} = await req.json();

	await connectMongoDB();

	try {
		const updatedMatch = await Match.findByIdAndUpdate(
			id,
			{
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
			{ new: true } // Return the updated document
		);

		if (!updatedMatch) {
			return NextResponse.json(
				{ message: "Match not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Match updated", match: updatedMatch },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
