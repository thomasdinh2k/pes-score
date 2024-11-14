import { Match } from "../types/data.type";

// POST new match data
export const postMatch = async (matchInfo: Match) => {
	try {
		const res = await fetch("http://localhost:3000/api/match", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(matchInfo),
		});
		const data = await res.json();

		if (!res || !res.status) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unexpected error occurred.");
		}
	}
};

export const deleteMatch = async (id: number) => {
	const confirmed = confirm("Are you sure you want to delete this match?");
	if (!confirmed) {
		return;
	}

	try {
		const res = await fetch(`http://localhost:3000/api/match?id=${id}`, {
			method: "DELETE",
		});
		const data = await res.json();

		if (!res || !res.status) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unexpected error occurred.");
		}
	}
};

export const deleteAllMatches = async () => {
	const confirmed = confirm("Are you sure you want to delete all matches?");

	if (!confirmed) {
		return;
	}

	try {
		const res = await fetch("http://localhost:3000/api/matches", {
			method: "DELETE",
		});

		const data = await res.json();

		if (!res || !res.status) {
			throw new Error(data.message);
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unexpected error occurred.");
		}
	}
};
