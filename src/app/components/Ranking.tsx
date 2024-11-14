"use client";
import type { PlayerRank } from "../types/data.type";
import { Table } from "antd";
import type { TableProps } from "antd";

const Ranking = ({
	rankingData,
	loading,
}: {
	rankingData: PlayerRank[];
	loading: boolean;
}) => {
	const columns: TableProps<PlayerRank>["columns"] = [
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

	return (
		<>
			<h2>Ranking</h2>
			<Table<PlayerRank>
				columns={columns}
				dataSource={rankingData}
				loading={loading}
				pagination={false}
			/>
		</>
	);
};

export default Ranking;
