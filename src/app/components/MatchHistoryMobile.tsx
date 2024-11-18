import MatchResult from "../components/MatchResult";
import { Match } from "../types/data.type";

type Props = {
	matches: Match[];
};

const MatchHistoryMobile = ({ matches }: Props) => {
	return (
		<div className="p-4">
			{matches
				.slice() // Make a copy of an array and then reverse it (to show latest matches first)
				.reverse()
				.map((result) => (
					<MatchResult key={result._id} result={result} />
				))}
		</div>
	);
};

export default MatchHistoryMobile;
