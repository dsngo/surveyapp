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
import { removeQuestion, updateStateStatus, updateQuestion } from "../redux/actionCreators";
import SelectField from "material-ui/SelectField";
import * as Templates from "../../types/questionTemplate";

const options = {
  "Long Question": "longQuestion",
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

class QuestionContainer extends React.Component<
  {
    questionData: any;
    removeQuestion: (questionId: number) => any;
  },
  {}
> {
  state = {
    questionType: "",
    openDialog: false,
    currentId: 0,
  };

  // handleOpenClosingDialog = (openClosingDialog: boolean) => this.setState(prevState => ({ ...prevState, openClosingDialog }));

  handleUpdateState = (stateKey: string, value: any) => this.setState((prevState: any) => ({ ...prevState, [stateKey]: value }));

  handleCreateQuestion = (questionType: string) => {
    const { props: { questionData } } = this;
    return (
      // (questionType === "longQuestion" && <LongQuestion {...{ questionId }} />) ||
      questionType === "multipleChoices" && <MultipleChoicesQuestion {...{ questionData }} />
      // (questionType === "dropdown" && <DropdownQuestion {...{ questionId }} />) ||
      // (questionType === "multipleDropdown" && <MultipleDropdownQuestion {...{ questionId }} />) ||
      // (questionType === "checkbox" && <CheckboxQuestion {...{ questionId }} />) ||
      // (questionType === "priorityQuestion" && <PriorityQuestion {...{ questionId }} />)
    );
  };
  handleRemoveQuestion = (questionId: number) => {
    this.props.removeQuestion(questionId);
    this.handleUpdateState("openDialog", false);
  };

  render() {
    const {
      handleCreateQuestion,
      handleUpdateState,
      handleRemoveQuestion,
      props: { questionData },
      state: { openDialog, questionType, currentId },
    } = this;
    const renderTemplate = questionType || "multipleChoices";
    const activeQuestiton = `component-question ${currentId === questionData.questionId ? "active-area" : ""}`;
    const actionsClosingDialog = [
      <FlatButton label="Cancel" primary onClick={() => handleUpdateState("openDialog",false)} />,
      <FlatButton label="Submit" secondary onClick={() => handleRemoveQuestion(questionData)} />,
    ];
    return (
      <div
        className={activeQuestiton}
        style={{ paddingBottom: "40px" }}
        onClick={e => updateStateStatus("currentId", questionData.questionId)}
      >
        <Dialog actions={actionsClosingDialog} open={openDialog} onRequestClose={() => handleUpdateState("openDialog",false)}>
          Are you sure you want to delete this question?
        </Dialog>
        <IconButton
          style={{ float: "right" }}
          tooltip="Remove question box"
          tooltipPosition="top-left"
          onClick={() => handleUpdateState("openDialog",true)}
        >
          <ContentClear />
        </IconButton>
        <div className="padding-25">
          <SelectField fullWidth onChange={(e, i, p) => handleUpdateState("questionType",p)} value={renderTemplate}>
            {selectOptionsArr.map((e, i) => <MenuItem key={`questionOption-${i}`} value={questionTypeArr[i]} primaryText={e} />)}
          </SelectField>
        </div>
        <div>{handleCreateQuestion(renderTemplate)}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionId: number) => dispatch(removeQuestion(questionId)),
});

export default connect(null, mapDispatchToProps)(QuestionContainer);
