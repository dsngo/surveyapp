import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FoF from "./FoF";
// import FormSubmit from "./FormSubmit";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./NavBar";
import QuestionContainer from "./questionComponents/QuestionContainer";
import SurveyForm from "./SurveyForm";
import Homepage from "./Homepage";
import ClientSurvey from "./ClientSurvey";

export const App: React.SFC = () => (
    <Router>
        <Provider store={store}>
            <MuiThemeProvider>
                <div>
                    <NavBar showSearch />
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        {/* <Route path="/survey/preview" component={ClientSurvey} /> */}
                        {/* <Route path="/survey/:id" component={ClientSurvey} /> */}
                        <Route path="/survey" component={SurveyForm} />
                        <Route component={FoF} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Provider>
    </Router>
);
