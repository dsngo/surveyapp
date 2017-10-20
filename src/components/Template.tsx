import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearSurveyData } from "./redux/actionCreators";


class Template extends React.Component<{
    clearSurveyData: () => any;
}> {
    clearData() {
        this.props.clearSurveyData();
    }
    render() {
        return (
            <Link className="col-sm-4 template-card-container" to="/survey" onClick= {() => this.clearData()}>
            <div className="template-card">
                <div className="template-card-thumbnail" />
                <div className="template-name">Template 1</div>
            </div>
        </Link>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    clearSurveyData: () => dispatch(clearSurveyData())
})
export default connect(null, mapDispatchToProps)(Template);
