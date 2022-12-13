import { configureStore } from "@reduxjs/toolkit";
import { workoutSlice } from "./reducers/dataReducer";
const store = configureStore({
    reducer: {
        data: workoutSlice.reducer,
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store