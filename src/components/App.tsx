import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FoF from "./FoF";
// import FormSubmit from "./FormSubmit";
// import Menu from "./Menu";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./NavBar";
// import SurveyForm from "./SurveyForm";
import MultipleDropdownQuestion from "./questionComponents/MultipleDropdownQuestion";

export const App: React.SFC = () => (
    <Router>
        <Provider store={store}>
            <MuiThemeProvider>
                <div>
                    <NavBar showSearch />
                    <Switch>
                        {<Route exact path="/" component={MultipleDropdownQuestion} />}
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
