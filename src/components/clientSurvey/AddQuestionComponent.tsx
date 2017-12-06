import * as React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import DropdownQuestion from "./DropdownQuestion";
import LongQuestion from "./LongQuestion";
import Dialog from "material-ui/Dialog";
import MultipleChoicesQuestion from "./MultipleChoicesQuestion";
import MultipleDropdownQuestion from "./MultipleDropdownQuestion";
import PriorityQuestion from "./PriorityQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ContentClear from "material-ui/svg-icons/content/clear";
import FlatButton from "material-ui/FlatButton";
import { removeQuestion, updateCurrentIndex, updateQuestion } from "../redux/actionCreators";
import SelectField from "material-ui/SelectField";
import * as Templates from "../../types/questionTemplate";
import ClientInfoComponent from "./ClientInfoComponent";

const options = {
  "Long Question": "longQuestion",
  "Short Question": "shortQuestion",
  "Multiple Choices Question": "multipleChoices",
  "Dropdown Question": "dropdown",
  "Multiple Dropdown Question": "multipleDropdown",
  Checkbox: "checkbox",
  "Priority Question": "priorityQuestion",
};

const selectOptionsArr: string[] = [];
const questionTypeArr: string[] = [];
for (const [key, val] of Object.entries(options)) {
  selectOptionsArr.push(key);
  questionTypeArr.push(val);
}

class AddQuestionComponent extends React.Component<
  {
    selectedQuestionType: string;
    questionIndex: number;
    removeQuestion: (questionIndex: number) => any;
    updateCurrentIndex: (currentIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
    questionData: any;
    currentIndex: number;
    isPreview: Boolean;
  },
  { questionType: string }
> {
  state = {
    questionType: "",
    openClosingDialog: false,
    questionData: {}
  };

  handleOpenClosingDialog = (openClosingDialog: boolean) => this.setState(prevState => ({ ...prevState, openClosingDialog }));
  // handleChangeQuestionType = (questionType: string) => this.setState(prevState => ({ ...prevState, questionType }));

  handleChangeQuestionType = (questionType: string) => {
    const questionData = Templates[questionType];
    this.props.updateQuestion(this.props.questionIndex, questionData);
    
  }
  handleCreateQuestion = (questionType: string, questionIndex: number) => {
    const { questionData } = this.props
    return (
      (questionType === "longQuestion" && <LongQuestion {...{ questionIndex, questionData }} />) ||
      (questionType === "multipleChoices" && <MultipleChoicesQuestion {...{ questionIndex, questionData }} />) ||
      (questionType === "dropdown" && <DropdownQuestion {...{ questionIndex, questionData }} />) ||
      (questionType === "multipleDropdown" && <MultipleDropdownQuestion {...{ questionIndex, questionData }} />) ||
      (questionType === "checkbox" && <CheckboxQuestion {...{ questionIndex, questionData }} />) ||
      (questionType === "priorityQuestion" && <PriorityQuestion {...{ questionIndex, questionData }} />)
    );
  };

  render() {
    const {
      handleCreateQuestion,
      handleChangeQuestionType,
      handleOpenClosingDialog,
      props: { removeQuestion, questionIndex, selectedQuestionType, questionData },
      state: {  openClosingDialog },
    } = this;
    const questionType = questionData.questionType;
    let activeQuestiton = "component-question ";
    activeQuestiton += this.props.currentIndex === questionIndex ? "active-area" : "";
    const actionsClosingDialog = [
      <FlatButton label="Cancel" primary onClick={() => handleOpenClosingDialog(false)} />,
      <FlatButton label="Submit" secondary onClick={() => removeQuestion(questionIndex)} />,
    ];
    return (
      <div style={{ paddingBottom: "40px" }} onClick={ e => this.props.updateCurrentIndex(questionIndex) }>
         <div >
          {handleCreateQuestion(questionType || selectedQuestionType, questionIndex)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  selectedQuestionType: state.stateStatus.selectedQuestionType,
  currentIndex: state.stateStatus.currentIndex
});

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateCurrentIndex: (currentIndex: number) => dispatch(updateCurrentIndex(currentIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
