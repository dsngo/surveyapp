// import FormSubmit from "./FormSubmit";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FoF from "./FoF";
import Landing from "./Landing";
import NavBar from "./NavBar";
// import QuestionContainer from './questionComponents/QuestionContainer';
import SurveyForm from "./SurveyForm";
// import ClientSurvey from './ClientSurvey';
import Scrollbars from "react-custom-scrollbars";
import SurveyClient from "./SurveyClient";


const theme = createMuiTheme({});

const App1 = () => (
  <React.Fragment>
    <NavBar showSearch />
    <Scrollbars style={{ height: "calc(100vh - 90px)" }}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/survey" component={SurveyForm} />
        <Route component={FoF} />
      </Switch>
    </Scrollbars>
  </React.Fragment>
);

export const App: React.SFC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/client-survey/render/:id" component={SurveyClient} />
        <Route component={App1} />
      </Switch>
    </MuiThemeProvider>
  </Router>
);
