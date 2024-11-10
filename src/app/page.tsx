"use client";

import { useEffect, useState } from "react";
import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";
import type { FetchedData } from "./types/data.type";
import { Skeleton } from "antd";

export default function Home() {
	const [data, setData] = useState<FetchedData>();
	const [loading, setLoading] = useState<boolean>(true);

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

			<section aria-label="ranking">
				<Ranking rankingData={data.ranking} loading={loading} />
			</section>

			<section aria-label="match-history">
				<MatchHistory />
			</section>
		</>
	);
}
