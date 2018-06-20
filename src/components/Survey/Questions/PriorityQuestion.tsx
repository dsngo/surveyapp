import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import * as React from "react";
import { connect } from "react-redux";
import { updateQuestion } from "../../redux/actionCreators";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: "0 10% 5%",
  },
  checkContainer: {
    display:"flex",
    minHeight: 48,
    paddingLeft: "10%",
  },
  keyText: {
    margin: "0 10px",
    fontWeight: "bold",
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

class PriorityQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    updateQuestion: (questionId: number, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = (type = "text", key?, val?) => (e, v?) => {
    const { questionId, options } = this.props.questionData;
    switch (type) {
      case "priority-add":
        return this.props.updateQuestion(questionId, "options", [
          ...options,
          {
            id: (Date.now() + 1).toString(36),
            key: String.fromCharCode(65 + options.length),
            text: "",
          },
        ]);
      case "priority-text":
        return this.props.updateQuestion(
          questionId,
          "options",
          options.map(a => (a.id === key ? { ...a, text: e.target.value } : a)),
        );
      case "priority-key":
        return this.props.updateQuestion(
          questionId,
          "options",
          options.map(a => (a.id === key ? { ...a, key: e.target.value } : a)),
        )
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
          placeholder="Priority question"
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
                  <TextField
                  select
                  onChange={this.handleChange("priority-key", choice.id)}
                  value={choice.key}
                >
                  {options.map((e, i) => (
                    <MenuItem key={e.id} value={String.fromCharCode(65+i)}>
                      {String.fromCharCode(65+i)}
                    </MenuItem>
                  ))}
                </TextField>
                }
                label={
                  <TextField
                    fullWidth
                    placeholder="Enter a response here."
                    multiline
                    value={choice.text}
                    onChange={this.handleChange("priority-text", choice.id)}
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
          onClick={this.handleChange("priority-add")}
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
)(withStyles(styles as any)(PriorityQuestion));
