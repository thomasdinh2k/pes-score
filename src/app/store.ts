import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "./slices/matchSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
	reducer: {
		match: matchReducer,
		message: messageReducer,
	},
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
