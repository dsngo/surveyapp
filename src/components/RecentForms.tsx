import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Template from "./Template";

const RecentForms: React.SFC = props => (
    <div className="your-forms">
        <div className="container your-forms">
            <div className="row title-your-forms">Your recent forms</div>
            <div className="row">
                <Template />
                <Template />
                <Template />
            </div>
        </div>
    </div>
);

export default connect()(RecentForms);
