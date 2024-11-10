import React from "react";
import type { Matches } from "../types/data.type";
import { Table, TableProps } from "antd";

type Props = {
	matchesData: Matches[];
};

const MatchHistory = ({ matchesData }: Props) => {
	const winnerStyle = { color: "green", fontWeight: "bolder" };

	const columns: TableProps<Matches>["columns"] = [
		{
			title: "Match",
			dataIndex: "match_number",
			key: "match_number",
			render: (_, __, index) => <span>{index + 1}</span>,
		},
		{
			title: "Home Player",
			dataIndex: "home_player",
			key: "home_player",
			render: (value, record) => {
				const isWinner = record.home_score > record.away_score;
				return <span style={isWinner ? winnerStyle : {}}>{value}</span>;
			},
		},
		{
			title: "Home Team",
			dataIndex: "home_team",
			key: "home_team",
			render: (value, record) => {
				const isWinner = record.home_score > record.away_score;

				return <span style={isWinner ? winnerStyle : {}}>{value}</span>;
			},
		},
		{
			title: "",
			dataIndex: "home_score",
			key: "home_score",
			render: (value, record) => (
				<span style={value > record.away_score ? winnerStyle : {}}>
					{value}
				</span>
			),
		},
		{
			title: "",
			dataIndex: "away_score",
			key: "away_score",
			render: (value, record) => (
				<span
					style={
						value > record.home_score
							? { color: "green", fontWeight: "bolder" }
							: {}
					}
				>
					{value}
				</span>
			),
		},
		{
			title: "Away Team",
			dataIndex: "away_team",
			key: "away_team",
      render: (value, record) => {
				const isWinner = record.home_score < record.away_score;
				return <span style={isWinner ? winnerStyle : {}}>{value}</span>;
			},
		},
		{
			title: "Away player",
			dataIndex: "away_player",
			key: "away_player",
      render: (value, record) => {
				const isWinner = record.home_score < record.away_score;
				return <span style={isWinner ? winnerStyle : {}}>{value}</span>;
			},
		},
	];


	return (
		<>
			<h2>Matches</h2>

			<Table<Matches>
				columns={columns}
				dataSource={matchesData}
				pagination={false}
			/>
		</>
	);
};

export default MatchHistory;
