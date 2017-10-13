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

  handleChangeTitle = (title: string) =>
    this.setState(prevState => ({
      ...prevState,
      title: title
    }));

  handleChangeDescription = (description: string) =>
    this.setState(prevState => ({
      ...prevState,
      description: description
    }));

  renderClientForm() {
    return (
      <div className="input-option-create">
          <div className="survey-title">{this.state.title}</div>
          <div className="survey-description">{this.state.description}</div>
      </div>
    );
  }

  renderFromCreate() {
    return (
      <div>
        <div className="padding-25-except-top input-option-create">
          <TextField
            name="surveyTitle"
            hintText="Title"
            fullWidth
            value={this.state.title}
            onChange={(e: any) => this.handleChangeTitle(e.target.value)}
            floatingLabelText="Title"
          />
          <TextField
            name="surveyDescription"
            hintText="Description"
            multiLine
            fullWidth
            value={this.state.description}
            onChange={(e: any) => this.handleChangeDescription(e.target.value)}
            floatingLabelText="Description"
          />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="question-components">
        {this.state.completed === false
          ? this.renderFromCreate()
          : this.renderClientForm()}
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
