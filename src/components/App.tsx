// import FormSubmit from "./FormSubmit";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FoF from "./FoF";
import LandingPage from "./Landing";
// import HomePage from "./Home"
import NavBar from "./NavBar";
// import QuestionContainer from './questionComponents/QuestionContainer';
import SurveyPage from "./Survey";
// import ClientSurvey from './ClientSurvey';
import Scrollbars from "react-custom-scrollbars";
import ClientPage from "./Client";


const theme = createMuiTheme({});

const MainApp = () => (
  <React.Fragment>
    <NavBar />
    <Scrollbars style={{ height: "calc(100vh - 90px)" }}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route exact path="/home" component={HomePage} /> */}
        <Route path="/survey/:activeId" component={SurveyPage} />
        <Route component={FoF} />
      </Switch>
    </Scrollbars>
  </React.Fragment>
);

export const App: React.SFC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/client-survey/render/(:formId)" component={ClientPage} />
        <Route component={MainApp} />
      </Switch>
    </MuiThemeProvider>
  </Router>
);
