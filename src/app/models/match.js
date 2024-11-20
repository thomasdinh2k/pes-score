import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
	match_number: { type: Number, required: true, unique: true },
	date: { type: String, required: true }, // Store as ISO Date if possible for better query options
	time: { type: String, required: true },
	home_player: { type: String, required: true },
	home_team: { type: String }, // Optional field since not all entries have home_team
	home_score: { type: Number, required: true },
	away_player: { type: String, required: true },
	away_team: { type: String }, // Optional field since not all entries have away_team
	away_score: { type: Number, required: true },
});

const Match = mongoose.models.Match ||  mongoose.model("Match", matchSchema); // If there's no model, then create one, if not, use existing model

export default Match
