import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Template: React.SFC = props => (
    <Link className="col-sm-4 template-card-container" to="/survey">
        <div className="template-card">
            <div className="template-card-thumbnail" />
            <div className="template-name">Template 1</div>
        </div>
    </Link>
);

export default connect()(Template);
