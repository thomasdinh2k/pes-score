import MatchResult from "../components/MatchResult";
import { Match } from "../types/data.type";

type Props = {};

const MatchHistoryMobile = (props: Props) => {
	const sample: Match[] = [
		{
			match_number: 1,
			date: "2024-11-10",
			time: "08:00",
			home_player: "Tân",
			home_team: "Bayern Munich",
			home_score: 2,
			away_player: "Tùng",
			away_team: "Manchester City",
			away_score: 3,
		},
		{
			match_number: 2,
			date: "2024-11-10",
			time: "08:30",
			home_player: "Định",
			home_team: "Inter Milan",
			home_score: 1,
			away_player: "Tùng",
			away_team: "Bayern Munich",
			away_score: 2,
		},
		{
			match_number: 3,
			date: "2024-11-10",
			time: "09:00",
			home_player: "Tùng",
			home_team: "Barca",
			home_score: 2,
			away_player: "Định",
			away_team: "Real",
			away_score: 0,
		},
		{
			match_number: 4,
			date: "2024-11-10",
			time: "09:30",
			home_player: "Tân",
			home_team: "Liverpool",
			home_score: 2,
			away_player: "Tùng",
			away_team: "Manchester City",
			away_score: 0,
		},
		{
			match_number: 5,
			date: "2024-11-10",
			time: "10:00",
			home_player: "Tân",
			home_team: "Liverpool",
			home_score: 5,
			away_player: "Tùng",
			away_team: "Manchester City",
			away_score: 2,
		},
		{
			match_number: 6,
			date: "2024-11-10",
			time: "10:30",
			home_player: "Định",
			home_score: 1,
			away_player: "Tân",
			away_score: 0,
		},
		{
			match_number: 7,
			date: "2024-11-10",
			time: "11:00",
			home_player: "Định",
			home_score: 3,
			away_player: "Tân",
			away_score: 1,
		},
		{
			match_number: 8,
			date: "2024-11-10",
			time: "11:30",
			home_player: "Tùng",
			home_score: 7,
			away_player: "Tân",
			away_score: 2,
		},
		{
			match_number: 9,
			date: "2024-11-10",
			time: "12:00",
			home_player: "Định",
			home_score: 3,
			away_player: "Tùng",
			away_score: 2,
		},
		{
			match_number: 10,
			date: "2024-11-10",
			time: "12:30",
			home_player: "Định",
			home_score: 3,
			away_player: "Tân",
			away_score: 2,
		},
		{
			match_number: 11,
			date: "2024-11-10",
			time: "13:00",
			home_player: "Tân",
			home_score: 5,
			away_player: "Tùng",
			away_score: 0,
		},
		{
			match_number: 12,
			date: "2024-11-10",
			time: "13:30",
			home_player: "Định",
			home_score: 4,
			away_player: "Tùng",
			away_score: 1,
		},
		{
			match_number: 13,
			date: "2024-11-10",
			time: "14:00",
			home_player: "Tân",
			home_score: 2,
			away_player: "Định",
			away_score: 1,
		},
		{
			match_number: 14,
			date: "2024-11-10",
			time: "14:30",
			home_player: "Tùng",
			home_score: 5,
			away_player: "Tân",
			away_score: 2,
		},
		{
			match_number: 15,
			date: "2024-11-10",
			time: "15:00",
			home_player: "Định",
			home_score: 2,
			away_player: "Tùng",
			away_score: 0,
		},
		{
			match_number: 16,
			date: "2024-11-10",
			time: "20:00",
			home_player: "Tùng",
			home_team: "Liverpool",
			home_score: 2,
			away_player: "Quân",
			away_team: "Manchester United",
			away_score: 2,
		},
	];

	return (
		<div className="p-4">
			{sample.map((result) => (
				<MatchResult key={result._id} result={result} />
			))}
		</div>
	);
};

export default MatchHistoryMobile;
