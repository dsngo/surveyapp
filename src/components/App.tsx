import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "./redux/store";
import NavBar from "./NavBar";
import Menu from "./Menu";
import SurveyForm from "./SurveyForm";
import FoF from "./FoF"

export const App: React.SFC = () => (
    <Router>
        <Provider store={store}>
            <div>
                <NavBar showSearch />
                <Switch>
                    <Route exact path="/" component={Menu} />
                    <Route path="/newform" component={SurveyForm} />
                    <Route component={FoF} />
                </Switch>
            </div>
        </Provider>
    </Router>
);
