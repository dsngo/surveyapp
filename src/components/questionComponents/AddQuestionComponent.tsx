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
import ShortQuestion from "./ShortQuestion";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ContentClear from "material-ui/svg-icons/content/clear";
import FlatButton from "material-ui/FlatButton";
import { removeQuestion, updateCurrentIndex, updateQuestion } from "../redux/actionCreators";
import SelectField from "material-ui/SelectField";
import * as Templates from "../../types/questionTemplate";

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
    console.log(questionType);
    
    const questionData = Templates[questionType];
    // this.setState(prevState => ({ ...prevState, questionType, questionData: questionData}));
    this.props.updateQuestion(this.props.questionIndex, questionData);
    
  }
  handleCreateQuestion = (questionType: string, questionIndex: number) => {
    return (
      (questionType === "longQuestion" && <LongQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "shortQuestion" && <ShortQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "multipleChoices" && <MultipleChoicesQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "dropdown" && <DropdownQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "multipleDropdown" && <MultipleDropdownQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "checkbox" && <CheckboxQuestion {...{ questionIndex, questionData: this.props.questionData }} />) ||
      (questionType === "priorityQuestion" && <PriorityQuestion {...{ questionIndex, questionData: this.props.questionData }} />)
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
    console.log(questionType);
    
    const actionsClosingDialog = [
      <FlatButton label="Cancel" primary onClick={() => handleOpenClosingDialog(false)} />,
      <FlatButton label="Submit" secondary onClick={() => removeQuestion(questionIndex)} />,
    ];
    return (
      <div className="component-question" style={{ width: "90%", margin: "10px auto" }}>
        <Dialog actions={actionsClosingDialog} open={openClosingDialog} onRequestClose={() => handleOpenClosingDialog(false)}>
          Are you sure to delete this question?
        </Dialog>
        <IconButton
          style={{ float: "right" }}
          tooltip="Remove question box"
          tooltipPosition="top-left"
          onClick={() => handleOpenClosingDialog(true)}
        >
          <ContentClear />
        </IconButton>
        <div className="padding-25">
          <SelectField fullWidth onChange={(e, i, p) => handleChangeQuestionType(p)} value={ questionType }>
            {selectOptionsArr.map((e, i) => <MenuItem key={`questionOption-${i}`} value={questionTypeArr[i]} primaryText={e} />)}
          </SelectField>
        </div>
        <div >
          {handleCreateQuestion(questionType || selectedQuestionType, questionIndex)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  selectedQuestionType: state.stateStatus.selectedQuestionType,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateCurrentIndex: (currentIndex: number) => dispatch(updateCurrentIndex(currentIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
