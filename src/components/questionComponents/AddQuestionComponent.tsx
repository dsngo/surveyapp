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

const selectOptions: string[] = [];
const questionType: string[] = [];
for (const [key, val] of Object.entries(options)) {
  selectOptions.push(key);
  questionType.push(val);
}

class AddQuestionComponent extends React.Component<{
  questionIndex: number;
  removeQuestion: (questionIndex: number) => any;
  updateCurrentIndex: (currentIndex: number) => any;
  
}, { questionType: string}> {
  state = {
    questionType: "longQuestion",
  };

  handleChangeQuestionType = (questionType: string) => this.setState({ questionType });

  render() {
    const { handleChangeQuestionType, props: { removeQuestion, questionIndex } } = this;
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
          {selectOptions.map((e, i) => <MenuItem key={`questionOption-${i}`} value={questionType[i]} primaryText={e} />)}
        </DropDownMenu>
      </Paper>
    );
  }
}

const mapStateToProps = (state: any)=> ({
  questionIndex: state.status.currentIndex,
})

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateCurrentIndex: (currentIndex: number) => dispatch(updateCurrentIndex(currentIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionComponent);
