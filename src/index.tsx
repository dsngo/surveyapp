import * as React from "react";
import { render } from "react-dom";
import Root from "./components/Root";
import configureStore from "./components/redux/configureStore";
import reducers from "./components/redux/reducers";

const store = configureStore();

const renderApp = Component => {
  render(<Component store={store} />, document.getElementById("app"));
};

renderApp(Root);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./components/Root", () => {
      import("./components/Root").then(({ default: nextRoot }) => {
        renderApp(nextRoot);
      });
    });
    module.hot.accept("./components/redux/reducers", () => {
      store.replaceReducer(reducers);
    });
  }
}
