import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

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
