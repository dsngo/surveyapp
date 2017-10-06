import * as React from "react";
import { App } from "./components/App";
import { render } from "react-dom";

const renderApp = (app: JSX.Element) => {
  render(app, document.getElementById("app"));
};

if (process.env.NODE_ENV === "production") {
  renderApp(<App />);
} else {
  const HotContainer = require("react-hot-loader").AppContainer;
  renderApp(
    <HotContainer>
      <App />
    </HotContainer>,
  );
  if (module.hot) {
    module.hot.accept("./components/App", async () => {
      const NextApp = (await import("./components/App")).App;
      renderApp(
        <HotContainer>
          <NextApp />
        </HotContainer>,
      );
    });
  }
}
