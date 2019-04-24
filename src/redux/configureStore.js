import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for reux dev tools
  return createStore(
    initialState,
    rootReducer,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
