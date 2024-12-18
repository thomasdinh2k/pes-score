export interface FetchedData {
	ranking: PlayerRank[];
	matches: Match[];
}

export interface PlayerRank {
	rank: number;
	player: string;
	wins: number;
	draws: number;
	losses: number;
	goals_for: number;
	goals_against: number;
	goal_difference: number;
	points: number;
}

export interface Match {
	_id?: number;
	match_number: number;
	home_player: string;
	home_team?: string;
	home_score: number;
	away_player: string;
	away_team?: string;
	away_score: number;
	date: string;
	time: string;
}
