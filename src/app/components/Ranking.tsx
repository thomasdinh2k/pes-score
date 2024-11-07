"use client";
import { useEffect, useState } from "react";
import type { FetchedData, Ranking } from "../types/data.type";
import { Table } from "antd";
import type { TableProps } from "antd";

const Ranking = () => {
	const [rankingData, setRankingData] = useState<FetchedData>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		const response = await fetch("/data/ranking.json");
		const data = await response.json();
		setRankingData(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const columns: TableProps<Ranking>["columns"] = [
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

	// const data: FetchedData['ranking'] = [
	// 	{
	// 		key: "1",
	// 		name: "John Brown",
	// 		age: 32,
	// 		address: "New York No. 1 Lake Park",
	// 		tags: ["nice", "developer"],
	// 	},
	// 	{
	// 		key: "2",
	// 		name: "Jim Green",
	// 		age: 42,
	// 		address: "London No. 1 Lake Park",
	// 		tags: ["loser"],
	// 	},
	// 	{
	// 		key: "3",
	// 		name: "Joe Black",
	// 		age: 32,
	// 		address: "Sydney No. 1 Lake Park",
	// 		tags: ["cool", "teacher"],
	// 	},
	// ];

	return (
		<>
			<h2>Ranking</h2>

			<Table<Ranking>
				columns={columns}
				dataSource={rankingData?.ranking}
				loading={loading}
			/>
		</>
	);
};

export default Ranking;
