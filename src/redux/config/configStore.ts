import {combineReducers, configureStore, EnhancedStore} from "@reduxjs/toolkit";
import user, { UserState } from "../reducers/userSlice";
import todos, { TodosState } from "../reducers/todosSlice";

// Define root state type
export type RootState = {
  user: UserState;
  todos: TodosState;
};

// 1. combine reducers
const rootReducer = combineReducers<RootState>({
  user, todos
});

// 2. create store
const store: EnhancedStore<RootState> = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// 3. export
export default store;
