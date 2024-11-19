import { Match, PlayerRank } from "../types/data.type";

export const calculateData = (matchHistory: Match[]): PlayerRank[] => {
	const rankingResult: PlayerRank[] = [];

	const initialData = {
		rank: 0,
		wins: 0,
		draws: 0,
		losses: 0,
		goals_for: 0,
		goals_against: 0,
		goal_difference: 0,
		points: 0,
	};

	matchHistory.forEach((match) => {
		const n_HomePlayer: string = normalizeWord(match.home_player);
		const n_awayPlayer: string = normalizeWord(match.away_player);

		// Ensure players exist in the array as objects, not by named keys
		let homePlayerData = rankingResult.find(
			(player) => player.player === n_HomePlayer
		);
		let awayPlayerData = rankingResult.find(
			(player) => player.player === n_awayPlayer
		);

		if (!homePlayerData) {
			homePlayerData = {
				player: n_HomePlayer,
				...initialData,
			};
			rankingResult.push(homePlayerData);
		}

		if (!awayPlayerData) {
			awayPlayerData = {
				player: n_awayPlayer,
				...initialData,
			};
			rankingResult.push(awayPlayerData);
		}

		// Calculate wins/draws/losses
		if (match.home_score > match.away_score) {
			homePlayerData.wins++;
			awayPlayerData.losses++;

			homePlayerData.points += 3;
		} else if (match.home_score < match.away_score) {
			awayPlayerData.wins++;
			homePlayerData.losses++;

			awayPlayerData.points += 3;
		} else if (match.home_score === match.away_score) {
			homePlayerData.draws++;
			awayPlayerData.draws++;
			homePlayerData.points++;
			awayPlayerData.points++;
		}

		// Calculate goals difference
		homePlayerData.goals_for += match.home_score;
		homePlayerData.goals_against += match.away_score;
		awayPlayerData.goals_for += match.away_score;
		awayPlayerData.goals_against += match.home_score;

		homePlayerData.goal_difference += match.home_score - match.away_score;
		awayPlayerData.goal_difference += match.away_score - match.home_score;
	});

	/* Ranking player based on
    1. Points
    2. Goal Difference
    3. Goal Scored
    4. Head to Head (advanced) 
    */
	rankingResult.sort((a, b) => {
		if (a.points !== b.points) {
			return b.points - a.points;
		}

		return b.goal_difference - a.goal_difference;
	});

	for (let i = 0; i < rankingResult.length; i++) {
		rankingResult[i].rank = i + 1;
	}

	return rankingResult;
};

export const normalizeWord = (word: string): string => {
	return word.normalize("NFC");
};

export const triggerRefresh = () => {
	window.location.reload();
};
