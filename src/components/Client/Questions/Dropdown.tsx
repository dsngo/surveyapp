import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: "0 10% 5%",
  },
  container: {
    width: "100%",
  },
  item: {
    display: "flex",
    minHeight: 48,
    marginLeft: "10%",
    width: "100%",
  },
};

class DropdownQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    onChangeContent: (questionId: any, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = e => {
    const { questionId, answers } = this.props.questionData;
    this.props.onChangeContent(questionId, "answers", e.target.value);
  };

  render() {
    const {
      classes,
      questionData: { questionId, question, options, description, answers },
    } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          required={!Boolean(answers)}
          select
          label="Select"
          className={classes.container}
          value={answers}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select an answer"
          margin="normal"
        >
          {options.map(choice => (
            <MenuItem key={choice.id} value={choice.text}>
              {choice.text}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default withStyles(styles as any)(DropdownQuestion);
