import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: "0 10% 5%",
  },
  container: {
    width: "100%"
  },
  item: {
    display: "flex",
    minHeight: 48,
    marginLeft: "10%",
  },
};

class CheckboxQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    onChangeContent: (questionId: any, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = key => (e, v) => {
    const { questionId, answers } = this.props.questionData;
    this.props.onChangeContent(
      questionId,
      "answers",
      v ? [...answers, key] : answers.filter(e => e !== key),
    );
  };

  render() {
    const {
      classes,
      questionData: { questionId, question, options, description, answers },
    } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.container} component="fieldset" required={answers.length === 0}>
          <FormLabel component="legend">Please check on applicable option</FormLabel>
          {options.map((choice: any) => (
            <FormControlLabel
              key={choice.id}
              className={classes.item}
              control={
                <Checkbox
                  checked={answers.includes(choice.id)}
                  onChange={this.handleChange(choice.id)}
                />
              }
              label={choice.text}
            />
          ))}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles as any)(CheckboxQuestion);
