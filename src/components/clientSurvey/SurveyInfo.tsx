import * as React from "react";
import { removeQuestion, updateQuestion, updateSurveyInfo } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class SurveyInfo extends React.Component<{
  updateSurveyInfo: (info: any) => any;
}> {
  state = {
    title: "Tst",
    description: "asdasd",
    completed: false
  };

  renderClientForm() {
    return (
      <div className="input-option-create">
          <div className="survey-title">{this.state.title}</div>
          <div className="survey-description">{this.state.description}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="question-components">
        {this.renderClientForm()}
      </div>
    );
  }
  componentDidUpdate() {
    // return this.props.updateQuestion(this.props.questionIndex, this.state);
    return this.props.updateSurveyInfo(this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateSurveyInfo: (info: any) => dispatch(updateSurveyInfo(info))
});

export default connect(null, mapDispatchToProps)(SurveyInfo);
