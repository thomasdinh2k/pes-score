import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	visible: false,
	currentMatchID: 0,
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
		},
	},
});

export const { showModal, hideModal } = matchSlice.actions;

export default matchSlice.reducer;
