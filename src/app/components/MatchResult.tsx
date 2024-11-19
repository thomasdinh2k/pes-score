import dayjs from "dayjs";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../slices/matchSlice";
import { Match } from "../types/data.type";

type MatchResultProps = {
	result: Match;
};

const ScoreBoard = ({
	home_score,
	away_score,
}: {
	home_score: number;
	away_score: number;
}) => {
	let objectColorClass;

	if (home_score > away_score) {
		objectColorClass = "bg-[#00985f]";
	} else if (home_score < away_score) {
		objectColorClass = "bg-[#dd3636]";
	} else {
		objectColorClass = "bg-[#7c817f]";
	}

	return (
		<div className="flex flex-col items-center">
			<div className="text-[0.35rem] uppercase">edit</div>
			<div
				className={`score-board ${objectColorClass} text-white px-2 py-1 font-bold rounded-md `}
			>
				{home_score} - {away_score}
			</div>
		</div>
	);
};

const PlayerName = ({
	playerName,
	clubName,
}: {
	playerName: string;
	clubName?: string;
}) => {
	if (!clubName) {
		return (
			<div className="flex flex-col gap-0 items-center align-middle">
				<span style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
					{playerName}
				</span>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-0 items-center align-middle">
			<span className="text-[0.5rem] -mb-2 font-light">{playerName}</span>
			<p
				className="text-lg whitespace-nowrap overflow-hidden truncate max-w-full"
				style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
			>
				{clubName}
			</p>
		</div>
	);
};

const MatchResult: FC<MatchResultProps> = ({ result }): React.JSX.Element => {
	const dispatch = useDispatch();

	const handleOpenEditModal = () => {
		const matchID = result._id;

		dispatch(showModal(matchID));
	};

	return (
		<>
			<div className="flex flex-col border-b border-gray-200 pb-2">
				<span className="top-half text-xs font-light text-gray-600 flex justify-between px-1 text-[0.5rem]">
					<p>{dayjs(result.date).format("ddd, DD MMM")}</p>
					<p>{result.time}</p>
				</span>
				<div className="bottom-half flex justify-center items-center gap-5">
					<div className="flex flex-1 justify-end">
						<PlayerName
							playerName={result.home_player}
							clubName={result.home_team}
						/>
					</div>
					<div className="flex-none" onClick={handleOpenEditModal}>
						<ScoreBoard
							home_score={result.home_score}
							away_score={result.away_score}
						/>
					</div>
					<div className="flex flex-1 justify-start">
						<PlayerName
							playerName={result.away_player}
							clubName={result.away_team}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default MatchResult;
