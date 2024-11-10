import React from "react";
import type { Matches } from "../types/data.type";
import { Table, TableProps } from "antd";

type Props = {
	matchesData: Matches[];
};

const MatchHistory = ({ matchesData }: Props) => {
	const columns: TableProps<Matches>["columns"] = [
		{
			title: "Rank",
			dataIndex: "rank",
			key: "rank",
			render: (_, __, index) => <span>{index + 1}</span>,
		},
		{
			title: "Player",
			dataIndex: "player",
			key: "player",
		},
		{
			title: "Wins",
			dataIndex: "wins",
			key: "wins",
		},
		{
			title: "Draws",
			dataIndex: "draws",
			key: "draws",
		},
		{
			title: "Losses",
			dataIndex: "losses",
			key: "losses",
		},
		{
			title: "Goal for/against",
			dataIndex: "goal_difference",
			key: "goal_difference",
			render: (_, record) => (
				<span>
					{record.goals_for}/{record.goals_against}
				</span>
			),
		},
		{
			title: "Goal Difference",
			dataIndex: "goal_difference",
			key: "goal_difference",
		},
		{
			title: "Points",
			dataIndex: "points",
			key: "points",
		},
	];

	console.log(matchesData);

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
