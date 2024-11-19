import type { FetchedData, Match } from "../types/data.type";

export const getAllMatches = async (): Promise<FetchedData> => {
	try {
		const res = await fetch("/api/match", {
			cache: "no-store",
		});

		const data = await res.json();

		if (!data || data.success === false) {
			throw new Error("Failed to fetch match data");
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
export const postMatch = async (matchInfo: Match) => {
	try {
		const res = await fetch("/api/match", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(matchInfo),
		});
		const data = await res.json();

		if (!res || !res.ok) {
			throw new Error(
				data.error || data.message || "Failed to post match"
			);
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

export const editMatch = async (matchID: number, matchInfo: Match) => {
	try {
		const res = await fetch(`/api/match/${matchID}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(matchInfo),
		});
		const data = await res.json();

		if (!res || !res.ok) {
			throw new Error(
				data.error || data.message || "Failed to put match"
			);
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
		const res = await fetch(`/api/match?id=${id}`, {
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
		const res = await fetch("/api/matches", {
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
