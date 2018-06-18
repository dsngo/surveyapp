import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
// import { loadState, saveState } from "../ultis";
import rootReducer from "./reducers";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(
    rootReducer,
    // persistedState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  // store.subscribe(
  //   throttle(() => {
  //     saveState({ userCartItems: store.getState().userCartItems });
  //   }, 1000),
  // );
  return store;
};

export default configureStore;
