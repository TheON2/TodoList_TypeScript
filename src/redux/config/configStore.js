import {combineReducers, configureStore} from "@reduxjs/toolkit";
import user from "../reducers/userSlice";
import todos from "../reducers/todosSlice";

const rootReducer = combineReducers({
  user,todos
});

// 2. create store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// 3. export
export default store;