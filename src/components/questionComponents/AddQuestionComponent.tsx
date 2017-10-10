import * as React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import DropdownQuestion from "./DropdownQuestion";
import LongQuestion from "./LongQuestion";
import MultipleChoicesQuestion from "./MultipleChoicesQuestion";
import MultipleDropdownQuestion from "./MultipleDropdownQuestion";
import PriorityQuestion from "./PriorityQuestion";
import ShortQuestion from "./ShortQuestion";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ContentClear from "material-ui/svg-icons/content/clear";
import { removeQuestion, updateCurrentIndex } from "../redux/actionCreators";

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
  },
  { questionType: string }
> {
  state = {
    questionType: "",
  };

  handleChangeQuestionType = (questionType: string) => this.setState({ questionType });

  handleCreateQuestion = (questionType: string, questionIndex: number) => {
    return (
      (questionType === "longQuestion" && <LongQuestion {...{ questionIndex }} />) ||
      (questionType === "shortQuestion" && <ShortQuestion {...{ questionIndex }} />) ||
      (questionType === "multipleChoices" && <MultipleChoicesQuestion {...{ questionIndex }} />) ||
      (questionType === "dropdown" && <DropdownQuestion {...{ questionIndex }} />) ||
      (questionType === "multipleDropdown" && <MultipleDropdownQuestion {...{ questionIndex }} />) ||
      // (questionType === "checkbox" && <CheckboxQuestion {...{ questionIndex }} />) ||
      (questionType === "priorityQuestion" && <PriorityQuestion {...{ questionIndex }} />)
    );
  };

  render() {
    const {
      handleCreateQuestion,
      handleChangeQuestionType,
      props: { removeQuestion, questionIndex, selectedQuestionType },
      state: { questionType },
    } = this;
    return (
      <Paper zDepth={2} style={{ width: "90%", margin: "10px auto" }}>
        <IconButton
          style={{ float: "right" }}
          tooltip="Remove question box"
          tooltipPosition="top-left"
          onClick={e => removeQuestion(questionIndex)}
        >
          <ContentClear />
        </IconButton>
        <DropDownMenu onChange={(e, i, p) => handleChangeQuestionType(p)}>
          {selectOptionsArr.map((e, i) => <MenuItem key={`questionOption-${i}`} value={questionTypeArr[i]} primaryText={e} />)}
        </DropDownMenu>
        {handleCreateQuestion(questionType || selectedQuestionType, questionIndex)}
      </Paper>
    );
  }
}

const mapStateToProps = (state: any) => ({
  questionIndex: state.stateStatus.currentIndex,
  selectedQuestionType: state.stateStatus.selectedQuestionType,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateCurrentIndex: (currentIndex: number) => dispatch(updateCurrentIndex(currentIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
