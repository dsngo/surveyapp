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

export const App: React.SFC = () => (
    <Router>
        <Provider store={store}>
            <MuiThemeProvider>
                <div>
                    <NavBar showSearch />
                    <Switch>
                        {<Route exact path="/" component={SurveyForm} />}
                        {/* <Route exact path="/" component={Menu} /> */}
                        {/* <Route path="/newform" component={SurveyForm} /> */}
                        {/* <Route path="/form/:id" component={FormSubmit} /> */}
                        {/* <Route path="/editform/:id" component={SurveyForm} /> */}
                        <Route component={FoF} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Provider>
    </Router>
);
