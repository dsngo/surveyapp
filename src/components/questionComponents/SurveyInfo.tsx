import * as React from "react";
import { removeQuestion, updateQuestion, updateSurveyInfo } from "../redux/actionCreators";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class SurveyInfo extends React.Component<{
  title: string;
  description: string;
  updateSurveyInfo: (infoKey: string, value: any) => any;
}> {
  renderFormCreate = () => {
    const { updateSurveyInfo, title, description } = this.props;
    return (
      <div>
        <div className="padding-25-except-top input-option-create">
          <TextField
            name="surveyTitle"
            hintText="Title"
            fullWidth
            value={this.props.title}
            onChange={(e: any) => updateSurveyInfo("title", e.target.value)}
            floatingLabelText="Title"
          />
          <TextField
            name="surveyDescription"
            hintText="Description"
            multiLine
            fullWidth
            value={this.props.description}
            onChange={(e: any) => updateSurveyInfo("description", e.target.value)}
            floatingLabelText="Description"
          />
        </div>
      </div>
    );
  };
  render() {
    return <div className="question-components">{this.renderFormCreate()}</div>;
  }
}

const mapStateToProps = (state: any) => ({
  title: state.surveyInfo.title,
  description: state.surveyInfo.description,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSurveyInfo: (infoKey: string, value: any) => dispatch(updateSurveyInfo(infoKey, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SurveyInfo);
