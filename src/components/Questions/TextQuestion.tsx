import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { updateQuestion } from "../redux/actionCreators";
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
    isRenderClient?: boolean;
    updateQuestion: (questionId: number, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = (key, val?) => (e, v?) => {
    const { questionId } = this.props.questionData;
    this.props.updateQuestion(questionId, key, val || e.target.value);
  };
  renderFormClient() {
    const {
      questionData: { questionId, question, answers, description },
      updateQuestion,
    } = this.props;
    return (
      <div>
        {/* <Typography>{question}</Typography>
        <Typography>{description}</Typography>
        <TextField
          label="Answer"
          placeholder="Put your answer here"
          multiline
          fullWidth
          rows={4}
          value={this.getAnswerString(answers)}
          onChange={(e: any) => saveAnswerString(questionId, e.target.value)}
        /> */}
      </div>
    );
  }
  renderFormCreate = () => {
    const { classes } = this.props;
    const { question, description } = this.props.questionData;
    return (
      <div className={classes.root}>
        <TextField
          label="Question"
          placeholder="Please type in question"
          multiline
          fullWidth
          value={question}
          onChange={this.handleChange("question")}
        />
        <TextField
          label="Description"
          placeholder="Please type in description"
          multiline
          fullWidth
          value={description}
          onChange={this.handleChange("description")}
        />
      </div>
    );
  };
  render() {
    return this.props.isRenderClient
      ? this.renderFormClient()
      : this.renderFormCreate();
  }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  updateQuestion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(TextQuestion));
