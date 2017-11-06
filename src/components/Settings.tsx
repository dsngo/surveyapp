import * as React from "react";
import { addNewQuestion } from "./redux/actionCreators";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";

interface ISettings {
  selectedQuestionType: string;
  currentIndex: number;
  addNewQuestion: () => any;
}

const Settings: React.SFC<ISettings> = props => {
  const {
    currentIndex,
    selectedQuestionType,
    addNewQuestion,
  } = props;

  return (
    <Paper className="menu-settings">
      <Paper>
        <Paper className="settings-icon" onClick={e => addNewQuestion()}>
          <i className="fa fa-plus-circle" />
        </Paper>
      </Paper>
      <Paper>
        <Paper className="settings-icon add-text">
          <i className="fa fa-font" aria-hidden="true" />
        </Paper>
      </Paper>
      <Paper>
        <Paper className="settings-icon">
          <i className="fa fa-picture-o" aria-hidden="true" />
        </Paper>
      </Paper>
      <Paper>
        <Paper className="settings-icon">
          <i className="fa fa-youtube-play" aria-hidden="true" />
        </Paper>
      </Paper>
      <Paper>
        <Paper className="settings-icon">
          <i className="fa fa-bars" aria-hidden="true" />
        </Paper>
      </Paper>
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  // surveyData: state.surveyData,
  selectedQuestionType: state.stateStatus.selectedQuestionType,
  currentIndex: state.stateStatus.currentIndex,
});

const mapDispatchToProps = (dispatch: any) => ({
  // addArea: (area: any) => dispatch(addArea(area)),
  addNewQuestion: () => dispatch(addNewQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
