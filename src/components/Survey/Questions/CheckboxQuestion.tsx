import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import * as React from "react";
import { connect } from "react-redux";
import { updateQuestion } from "../../redux/actionCreators";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: "0 10% 5%",
  },
  checkContainer: {
    display:"flex",
    minHeight: 48,
    paddingLeft: "10%",
  },
  form: {
    width: "100%",
  },
  label: {
    width: "30vw",
  },
  addButton: {
    display: "flex",
    marginLeft: "auto",
    marginRight: 0,
  },
};

class CheckboxQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    updateQuestion: (questionId: number, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = (type, key?, val?) => (e, v?) => {
    const { questionId, options } = this.props.questionData;
    switch (type) {
      case "checkbox-add":
        return this.props.updateQuestion(questionId, "options", [
          ...options,
          {
            id: (Date.now() + 1).toString(36),
            correct: false,
            text: "",
          },
        ]);
      case "checkbox-text":
        return this.props.updateQuestion(
          questionId,
          "options",
          options.map(a => (a.id === key ? { ...a, text: e.target.value } : a)),
        );
      case "check":
        return this.props.updateQuestion(
          questionId,
          "options",
          options.map(e => (e.id === key ? { ...e, correct: v } : e)),
        );
      case "remove":
        return this.props.updateQuestion(
          questionId,
          "options",
          options.filter(e => e.id !== key),
        );
      default:
        return this.props.updateQuestion(
          questionId,
          key,
          val || e.target.value,
        );
    }
  };

  renderFormCreate = () => {
    const {
      classes,
      updateQuestion,
      questionData: { questionId, question, options, description },
    } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          label="Question"
          placeholder="Checkbox question"
          multiline
          fullWidth
          value={question}
          onChange={this.handleChange("text", "question")}
        />
        <TextField
          label="Description"
          placeholder="Extra Description"
          multiline
          fullWidth
          value={description}
          onChange={this.handleChange("text", "description")}
        />
        <div>
          {options.map((choice: any) => (
            <div className={classes.checkContainer} key={choice.id}>
              <FormControlLabel
                classes={{ label: classes.label }}
                control={
                  <Checkbox checked={choice.correct} onChange={this.handleChange("check", choice.id)} />
                }
                label={
                  <TextField
                    fullWidth
                    placeholder="Enter a choice here."
                    multiline
                    value={choice.text}
                    onChange={this.handleChange("checkbox-text", choice.id)}
                  />
                }
              />
              {options.length > 1 && (
                <IconButton onClick={this.handleChange("remove", choice.id)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="fab"
          className={classes.addButton}
          mini
          color="secondary"
          onClick={this.handleChange("checkbox-add")}
        >
          <AddIcon />
        </Button>
      </div>
    );
  };

  render() {
    return this.renderFormCreate();
  }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  updateQuestion,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(CheckboxQuestion));
