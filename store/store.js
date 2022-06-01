import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};
const middlewares = [thunk];

export default createStore(
	reducers,
	initialState,
	composeWithDevTools(
		applyMiddleware(...middlewares)
		// window && window?.__REDUX_DEVTOOLS_EXTENSION__ && window?.__REDUX_DEVTOOLS_EXTENSION__?.()
	)
);
