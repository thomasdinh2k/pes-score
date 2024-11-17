"use client";

import { Space } from "antd";
import { Switch } from "antd-mobile";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";
import useViewport from "./hooks/viewport";
import { getAllMatches } from "./services/data.service";
import type { FetchedData, Match, PlayerRank } from "./types/data.type";

/**
 * The main page of the application, responsible for rendering the match history table,
 * the ranking table, and the match input form.
 *
 * The page fetches data from the server and stores it in the component state.
 * It also handles the business logic of ranking the players based on the match history.
 *
 * The page renders the following components:
 * - MatchInput: a form for inputting new matches
 * - Ranking: a table displaying the ranking of the players
 * - MatchHistory: a table displaying the match history
 *
 * The page also handles the state of whether the ranking and match history tables are shown or not.
 */
export default function Home() {
	const [data, setData] = useState<FetchedData>();
	const [rankingData, setRankingData] = useState<PlayerRank[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [isShow, setIsShow] = useState<{
		ranking: boolean;
		matches: boolean;
	}>({ ranking: true, matches: true });

	const viewPort = useViewport();
	const isMobile: boolean = viewPort.width <= 425;

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
		return <Loading />;
	}

	return (
		<>
			<h1 className="text-center font-bold my-5">
				Thomas&apos;s PES History
			</h1>
			<h1 className="text-lg text-center font-bold my-5">
				{viewPort.width} | {isMobile ? "Mobile" : "Desktop"}
			</h1>
			<section aria-label="match-input">
				<MatchInput matchQuantity={data.matches.length} />
			</section>

			<Space direction="horizontal">
				<Switch
					checkedText="Show Ranking"
					uncheckedText="Hide Ranking"
					defaultChecked
					onChange={(checked) =>
						setIsShow((prevState) => ({
							...prevState,
							ranking: checked,
						}))
					}
				/>
				<Switch
					checkedText="Show Matches"
					uncheckedText="Hide Matches"
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
