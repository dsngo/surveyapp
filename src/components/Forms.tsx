import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Template from "./Template";

const Forms: React.SFC = props => (
    <div className="container new-form">
        <div className="row title-new-form" style={{ marginTop: "15px" }}>
            <div className="title-survey-new-form">Create new form</div>
            <div className="settings-button">
                More templates
                <i className="fa fa-caret-square-o-down" aria-hidden="true" style={{ margin: "0 10px" }} />
                <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </div>
        </div>
        <div className="row">
            <Template />
        </div>
    </div>
);

export default connect()(Forms);
