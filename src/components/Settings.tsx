import * as React from "react";
import {connect} from "react-redux";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import {addQuestion} from "./redux/actionCreators";
interface ISettings {
  currentId: number;
  addNewQuestion: (questionId: number, template: any) => any;
}

const Settings: React.SFC<ISettings> = props => {
  const { currentId, addNewQuestion } = props;
  const template = {
      questionType: "multipleChoices",
      questionId: Date.now(),
      question: "",
      description: "",
      answers: [{
          correct: false,
          answer: ""
      }]
  }
  return (
    <Paper className="menu-settings">
      <Paper className="settings-icon" onClick={e => addNewQuestion(currentId, template)}>
        <FontIcon className="material-icons">add_box</FontIcon>
      </Paper>
      <Paper className="settings-icon add-text">
        <FontIcon className="material-icons">font_download</FontIcon>
      </Paper>
      <Paper className="settings-icon">
        <FontIcon className="material-icons">image</FontIcon>
      </Paper>
      <Paper className="settings-icon">
        <FontIcon className="material-icons">movie</FontIcon>
      </Paper>
      <Paper className="settings-icon">
        <FontIcon className="material-icons">storage</FontIcon>
      </Paper>
    </Paper>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  addNewQuestion: (questionId: number, template: any) => dispatch(addQuestion(questionId, template))
});

export default connect(null, mapDispatchToProps)(Settings);
