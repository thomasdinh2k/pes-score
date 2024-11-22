import { createSlice } from "@reduxjs/toolkit";

type MessageState = {
	type: "success" | "error" | "warning" | "info";
	content: string | null;
};

const initialState: MessageState = {
	type: "success",
	content: null,
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessage: (state, action) => action.payload,
		clearMessage: (state) => {
			state.content = null;
		},
	},
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
