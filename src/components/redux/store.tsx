import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

declare global {
    interface Window {
        devToolsExtension: () => any;
    }
}

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        typeof window === "object" && typeof window.devToolsExtension !== "undefined"
            ? window.devToolsExtension()
            : (f: any) => f,
    ),
);
