import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import * as classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Clear from "@material-ui/icons/Clear";
import * as React from "react";
import { connect } from "react-redux";
import { removeQuestion, replaceQuestion } from "../../redux/actionCreators";
import { createTemplate } from "../../ultis";
import CheckboxQuestion from "./CheckboxQuestion";
import PriorityQuestion from "./PriorityQuestion";
import TextQuestion from "./TextQuestion";

const options = {
  text: "Text Question",
  checkbox: "Checkbox Question",
  radio: "Radio Question",
  dropdown: "Dropdown Question",
  priority: "Priority Question",
  multipleDropdown: "Multiple Dropdown Question",
};
const questionTypeArr: string[] = Object.keys(options);

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: 5,
  },
  questionSelection: {
    marginTop: 5,
    marginLeft: "25%",
    width: "50%",
  },
  clearIcon: {
    float: "right",
  },
};

class QuestionContainer extends React.Component<
  {
    classes: any;
    questionData: any;
    replaceQuestion: (questionId, template) => any;
    removeQuestion: (questionId: number) => any;
  },
  {}
> {
  state = {
    isDialogOpen: false,
  };

  toggleDeleteDialog = () => {
    this.setState((pS: any) => ({ isDialogOpen: !pS.isDialogOpen }));
  };

  handleChangeQuestionType = e => {
    const { questionId } = this.props.questionData;
    const template = createTemplate(e.target.value, questionId);
    this.props.replaceQuestion(questionId, template);
  };

  handleRemoveQuestion = () => {
    const { questionId } = this.props.questionData;
    this.props.removeQuestion(questionId);
    this.setState({ isDialogOpen: false });
  };

  renderDeleteDialog = questionId => {
    const { isDialogOpen } = this.state;
    return (
      <Dialog open={isDialogOpen} onClose={this.toggleDeleteDialog}>
        <DialogTitle>
          Are you sure you want to delete this question?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={this.toggleDeleteDialog}>
            Cancel
          </Button>
          <Button
            variant="raised"
            color="secondary"
            onClick={this.handleRemoveQuestion}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  renderQuestion = () => {
    const { questionData } = this.props;
    switch (questionData.questionType) {
      case "text":
        return <TextQuestion {...{ questionData }} />;
      case "priority":
        return <PriorityQuestion {...{ questionData }} />;
      default:
        return <CheckboxQuestion {...{ questionData }} />;
    }
  };

  render() {
    const { classes, questionData } = this.props;
    const { isDialogOpen } = this.state;
    return (
      <div className={classes.root}>
        <TextField
          select
          className={classes.questionSelection}
          onChange={this.handleChangeQuestionType}
          value={questionData.questionType}
        >
          {questionTypeArr.map(e => (
            <MenuItem key={e} value={e}>
              {options[e]}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          className={classes.clearIcon}
          onClick={this.toggleDeleteDialog}
        >
          <Clear />
        </IconButton>
        {this.renderQuestion()}
        {this.renderDeleteDialog(questionData.questionId)}
        <Divider light />
      </div>
    );
  }
}

const mapDispatchToProps = {
  removeQuestion,
  replaceQuestion,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles as any)(QuestionContainer));
