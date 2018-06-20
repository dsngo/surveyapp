import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { updateQuestion } from "../../redux/actionCreators";
import { withStyles } from "@material-ui/core/styles";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: "0 10% 5%",
  },
};

class TextQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    onChangeContent: (questionId: any, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = key => e => {
    const { questionId } = this.props.questionData;
    this.props.onChangeContent(questionId, key, e.target.value);
  };

  render() {
    const { classes } = this.props;
    const { question, description, answer } = this.props.questionData;
    return (
      <div className={classes.root}>
        <TextField
          label="Answer"
          placeholder="Please type in your answer"
          multiline
          rows={3}
          rowsMax={6}
          fullWidth
          value={answer}
          onChange={this.handleChange("answer")}
        />
      </div>
    );
  };
}


export default withStyles(styles as any)(TextQuestion);
