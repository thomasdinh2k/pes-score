"use client";

import { Alert, Modal, Space } from "antd";
import { Switch } from "antd-mobile";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";
import useViewport from "./hooks/viewport";
import { getAllMatches } from "./services/match.service";
// import MatchHistoryMobile from "./test-ui/page";
import { Provider, useDispatch, useSelector } from "react-redux";
import MatchHistoryMobile from "./components/MatchHistoryMobile";

import EditMatchModal from "./components/EditMatchModal";
import { hideModal, setMatchDetail } from "./slices/matchSlice";

import { RootState, store } from "./store";
import type { FetchedData, PlayerRank } from "./types/data.type";
import { calculateData, triggerRefresh } from "./utils/util";
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
	return (
		// <SessionProvider session={sessions}>
		<Provider store={store}>
			<HomeContent />
		</Provider>
		// </SessionProvider>
	);
}
function HomeContent() {
	const [data, setData] = useState<FetchedData>();
	const [rankingData, setRankingData] = useState<PlayerRank[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [isShow, setIsShow] = useState<{
		ranking: boolean;
		matches: boolean;
	}>({ ranking: true, matches: true });
	const [errorMessage, setErrorMessage] = useState<{
		message: string;
		description?: string;
	}>();

	const viewPort = useViewport();
	const isMobile: boolean = viewPort.width <= 425;

	const matchRedux = useSelector((state: RootState) => state.match);
	const { visible, currentMatchID } = matchRedux;
	const dispatch = useDispatch();

	useEffect(() => {
		getAllMatches().then((data) => {
			if (data) {
				setData(data);
				dispatch(
					setMatchDetail(
						data.matches.filter(
							(match) => match._id === currentMatchID
						)[0]
					)
				);
				setLoading(false);
			}
		});
	}, [currentMatchID, dispatch]);

	useEffect(() => {
		// Calculate rankingData
		if (data && !loading) {
			const result = calculateData(data.matches);
			setRankingData(result);
		}
	}, [data, loading]);

	if (loading || !data || !rankingData) {
		return <Loading />;
	}

	return (
		<>
			<Modal
				title="Edit Match"
				centered
				open={visible}
				footer={null}
				onCancel={() => dispatch(hideModal())}
			>
				<EditMatchModal />
			</Modal>
			{errorMessage && (
				<Alert
					message={errorMessage.message}
					description={errorMessage.description || false}
					type="error"
					showIcon
					closable
					afterClose={() => {
						setErrorMessage(undefined);
					}}
				/>
			)}
			<h1 className="text-center font-bold my-5">
				Thomas&apos;s PES History
			</h1>
			<section aria-label="match-input">
				<MatchInput
					matchQuantity={data.matches.length}
					setErrorMessage={setErrorMessage}
				/>
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

			{isShow.matches && isMobile && (
				<section aria-label="match-score">
					<MatchHistoryMobile matches={data.matches} />
				</section>
			)}

			<section aria-label="match-history">
				{isShow.matches && !isMobile && (
					<MatchHistory
						matchesData={data.matches}
						triggerRefresh={triggerRefresh}
					/>
				)}
			</section>
		</>
	);
}
