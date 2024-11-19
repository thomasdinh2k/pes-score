import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	visible: false,
	currentMatchID: undefined,
	matchDetail: undefined,
};

export const matchSlice = createSlice({
	name: "match",
	initialState,
	reducers: {
		showModal: (state, action) => {
			state.visible = true;
			state.currentMatchID = action.payload;
		},
		hideModal: (state) => {
			state.visible = false;
			state.currentMatchID = undefined;
			state.matchDetail = undefined;
		},

		// Set matchDetail
		setMatchDetail: (state, action) => {
			state.matchDetail = action.payload;
		},
	},
});

export const { showModal, hideModal, setMatchDetail } = matchSlice.actions;

export default matchSlice.reducer;
