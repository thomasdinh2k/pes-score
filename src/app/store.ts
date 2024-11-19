import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "./reducers/matchReducer";

export default configureStore({
	reducer: {
		match: matchReducer,
	},
});
