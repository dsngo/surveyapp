import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FoF from "./FoF";
// import FormSubmit from "./FormSubmit";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./NavBar";
import AddQuestionComponent from "./questionComponents/AddQuestionComponent";
import SurveyForm from "./SurveyForm";
import Homepage from "./Homepage";

export const App: React.SFC = () => (
    <Router>
        <Provider store={store}>
            <MuiThemeProvider>
                <div>
                    <NavBar showSearch />
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route path="/survey" component={SurveyForm} />
                        <Route component={FoF} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Provider>
    </Router>
);
