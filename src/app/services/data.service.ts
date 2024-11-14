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
	} catch (error: any) {
        throw new Error(error.message);
    }
};
