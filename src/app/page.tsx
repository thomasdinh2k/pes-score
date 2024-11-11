"use client";

import { useEffect, useState } from "react";
import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";
import type { FetchedData } from "./types/data.type";
import { Skeleton, Space, Switch } from "antd";

export default function Home() {
	const [data, setData] = useState<FetchedData>();
	const [loading, setLoading] = useState<boolean>(true);
	const [isShow, setIsShow] = useState<{
		ranking: boolean;
		matches: boolean;
	}>({ ranking: true, matches: true });

	const fetchData = async () => {
		try {
			const response = await fetch("data/ranking.json");
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading || !data) {
		return <Skeleton />;
	}

	return (
		<>
			<h1 className="text-center font-bold my-5">
				Thomas&apos;s PES History
			</h1>
			<section aria-label="match-input">
				<MatchInput />
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
					<Ranking rankingData={data.ranking} loading={loading} />
				)}
			</section>

			<section aria-label="match-history">
				{isShow.matches && <MatchHistory matchesData={data.matches} />}
			</section>
		</>
	);
}
