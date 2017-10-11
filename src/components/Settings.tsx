import * as React from "react";
import { addNewQuestion, divideSection } from "./redux/actionCreators";
import { connect } from "react-redux";

interface ISettings {
  // addArea: (area: any) => string;
  selectedQuestionType: string;
  currentIndex: number;
  addNewQuestion: (questionIndex: number, questionData: any) => any;
  // surveyData: any[];
  divideSection: (value: boolean) => any;
}

const Settings: React.SFC<ISettings> = props => {
  const {
    currentIndex,
    selectedQuestionType,
    addNewQuestion,
    // surveyData,
    divideSection,
  } = props;
//   const areaQuestionTemplate = {
//     type: "question",
//     questionType: "",
//     multipleAnswer: [],
//     question: "",
//   };
//   const newQuestion: Types.IShortQuestion = {
//     questionType: "shortQuestion",
//     question: "",
//     description: "",
//     answers: [],
//   };
  return (
    <div className="menu-settings">
      <div>
        <div className="settings-icon add-question" onClick={e => addNewQuestion(currentIndex, selectedQuestionType)}>
          <i className="fa fa-plus-circle" />
        </div>
      </div>
      <div>
        <div className="settings-icon add-text">
          <i className="fa fa-font" aria-hidden="true" />
        </div>
      </div>
      <div>
        <div className="settings-icon">
          <i className="fa fa-picture-o" aria-hidden="true" onClick={e => divideSection(true)} />
        </div>
      </div>
      <div>
        <div className="settings-icon">
          <i className="fa fa-youtube-play" aria-hidden="true" />
        </div>
      </div>
      <div>
        <div className="settings-icon">
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  // surveyData: state.surveyData,
  selectedQuestionType: state.stateStatus.selectedQuestionType,
  currentIndex: state.stateStatus.currentIndex,
});

const mapDispatchToProps = (dispatch: any) => ({
  // addArea: (area: any) => dispatch(addArea(area)),
  addNewQuestion: (questionIndex: number, questionData: any) => dispatch(addNewQuestion(questionIndex, questionData)),
  divideSection: (value: boolean) => dispatch(divideSection(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
