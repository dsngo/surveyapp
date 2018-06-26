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
import CheckboxQuestion from "./Checkbox";
import PriorityQuestion from "./Priority";
import TextQuestion from "./Text";
import RadioQuestion from "./Radio";
import DropdownQuestion from "./Dropdown";
import Typography from "@material-ui/core/Typography";
import { ADD_QUESTION } from "../../redux/actions";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: "flex",
    flexDirection: "column",
    margin: 15,
  },
  content: {

  }
};

class QuestionContainer extends React.Component<
  {
    classes: any;
    questionData: any;
    onChangeContent: (id, k, v) => any;
  },
  {}
> {
  renderType = () => {
    const { questionData, onChangeContent } = this.props;
    switch (questionData.questionType) {
      case "text":
        return <TextQuestion {...{ questionData, onChangeContent }} />;
      case "radio":
        return <RadioQuestion {...{ questionData, onChangeContent }} />;
      case "dropdown":
        return <DropdownQuestion {...{ questionData, onChangeContent }} />;
      case "priority":
        return <PriorityQuestion {...{ questionData, onChangeContent }} />;
      // case "priority":
      //   return <PriorityQuestion {...{ questionData }} />;
      default:
        return <CheckboxQuestion {...{ questionData, onChangeContent }} />;
    }
  };
  render() {
    const { classes, questionData } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="display1" align="center">{questionData.question}</Typography>
        <Typography variant="subheading" align="center">{questionData.description}</Typography>
        <div className={classes.contents}>{this.renderType()}</div>
        <Divider light />
      </div>
    );
  }
}

export default withStyles(styles as any)(QuestionContainer);
