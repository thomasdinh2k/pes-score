"use client";

import { useEffect, useState } from "react";
import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";
import type { FetchedData, Match, PlayerRank } from "./types/data.type";
import { Skeleton, Space, Switch } from "antd";
import { getAllMatches } from "./services/data.service";

export default function Home() {
	const [data, setData] = useState<FetchedData>();
	const [rankingData, setRankingData] = useState<PlayerRank[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [isShow, setIsShow] = useState<{
		ranking: boolean;
		matches: boolean;
	}>({ ranking: true, matches: true });

	useEffect(() => {
		getAllMatches().then((data) => {
			if (data) {
				setData(data);
				setLoading(false);
			}
		});
	}, []);

	useEffect(() => {
		// Calculate rankingData

		const calculateData = (matchHistory: Match[]): PlayerRank[] => {
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

				homePlayerData.goal_difference +=
					match.home_score - match.away_score;
				awayPlayerData.goal_difference +=
					match.away_score - match.home_score;
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

		if (data && !loading) {
			const result = calculateData(data.matches);
			setRankingData(result);
		}
	}, [data, loading]);

	const normalizeWord = (word: string): string => {
		return word.normalize("NFC");
	};

	const triggerRefresh = () => {
		window.location.reload();
	};

	if (loading || !data || !rankingData) {
		return <Skeleton />;
	}

	return (
		<>
			<h1 className="text-center font-bold my-5">
				Thomas&apos;s PES History
			</h1>
			<section aria-label="match-input">
				<MatchInput
					matchQuantity={data.matches.length}
					triggerRefresh={triggerRefresh}
				/>
			</section>

			<Space direction="horizontal">
				<Switch
					checkedChildren="Show Ranking"
					unCheckedChildren="Hide Ranking"
					defaultChecked
					onChange={(checked) =>
						setIsShow((prevState) => ({
							...prevState,
							ranking: checked,
						}))
					}
				/>
				<Switch
					checkedChildren="Show Matches"
					unCheckedChildren="Hide Matches"
					defaultChecked
					onChange={(checked) =>
						setIsShow((prevState) => ({
							...prevState,
							matches: checked,
						}))
					}
				/>
			</Space>

			<section aria-label="ranking">
				{isShow.ranking && (
					<Ranking rankingData={rankingData} loading={loading} />
				)}
			</section>

			<section aria-label="match-history">
				{isShow.matches && (
					<MatchHistory
						matchesData={data.matches}
						triggerRefresh={triggerRefresh}
					/>
				)}
			</section>
		</>
	);
}
