import React from "react";
import type { Match } from "../types/data.type";
import { Button, Modal, Table, TableProps } from "antd";
import { createStyles } from "antd-style";
import { set } from "mongoose";

type Props = {
	matchesData: Match[];
};

const MatchHistory = ({ matchesData }: Props) => {
	const winnerStyle = { color: "green", fontWeight: "bolder" };
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const useStyle = createStyles(({ css, token }) => {
		const { antCls } = token;
		return {
			customTable: css`
				${antCls}-table {
					${antCls}-table-container {
						${antCls}-table-body,
						${antCls}-table-content {
							scrollbar-width: thin;
							scrollbar-color: #eaeaea transparent;
							scrollbar-gutter: stable;
						}
					}
				}
			`,
		};
	});

	const columns: TableProps<Match>["columns"] = [
		{
			title: "Match",
			dataIndex: "match_number",
			key: "match_number",
			render: (_, __, index) => <span>{index + 1}</span>,
			showSorterTooltip: { target: "full-header" },
			defaultSortOrder: "descend",
			sorter: (a, b) => a.match_number - b.match_number,
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
		{
			title: "Time",
			render: (_, record) => (
				<span>
					{record.date} at {record.time}
				</span>
			),
			defaultSortOrder: "descend",
			sorter: (a, b) => a.match_number - b.match_number,
		},
		{
			title: "Action",
			render: (_, record) => (
				<Button onClick={() => handleShowEditModal(record._id)}>
					Edit
				</Button>
			),
		},
	];

	const handleShowEditModal = (id: number) => {
		setIsModalOpen(true);
	};

	const onChange: TableProps<Match>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	const { styles } = useStyle();

	return (
		<>
			<Modal
				title="Vertically centered modal dialog"
				centered
				open={isModalOpen}
				// onOk={() => setModal2Open(false)}
				onCancel={() => setIsModalOpen(false)}
			>
				<p>some contents...</p>
				<p>some contents...</p>
				<p>some contents...</p>
			</Modal>


			<h2>Matches</h2>
			<Table<Match>
				className={styles.customTable}
				columns={columns}
				dataSource={matchesData}
				pagination={false}
				onChange={onChange}
				showSorterTooltip={{ target: "full-header" }}
        		scroll={{ y: 85 * 5 }}
			/>
		</>
	);
};

export default MatchHistory;
