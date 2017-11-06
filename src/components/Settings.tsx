import * as React from "react";
import { addNewQuestion } from "./redux/actionCreators";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
interface ISettings {
  selectedQuestionType: string;
  currentIndex: number;
  addNewQuestion: () => any;
}

const Settings: React.SFC<ISettings> = props => {
  const { currentIndex, selectedQuestionType, addNewQuestion } = props;

  return (
    <Paper className="menu-settings">
      <Paper className="settings-icon" onClick={e => addNewQuestion()}>
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

const mapStateToProps = (state: any) => ({
  selectedQuestionType: state.stateStatus.selectedQuestionType,
  currentIndex: state.stateStatus.currentIndex
});

const mapDispatchToProps = (dispatch: any) => ({
  addNewQuestion: () => dispatch(addNewQuestion())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
