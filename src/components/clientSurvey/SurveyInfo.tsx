import * as React from "react";
import { removeQuestion, updateQuestion, updateSurveyInfo } from "../redux/actionCreators";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class SurveyInfo extends React.Component<{
  info: any;
  updateSurveyInfo: (info: any) => any;
}> {
  state = {
    title: "",
    description: "",
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
      if (this.state.title !== this.props.info.title || this.state.description !== this.props.info.description) {
        this.setState(prevState => ({
          ...prevState,
          title: this.props.info.title,
          description: this.props.info.description,
        }))
      }
  }

}

const mapDispatchToProps = (dispatch: any) => ({
  updateSurveyInfo: (info: any) => dispatch(updateSurveyInfo(info))
});

const mapStateToProps = (state: any) => ({
  info: state.surveyInfo
})
export default connect(mapStateToProps, mapDispatchToProps)(SurveyInfo);
