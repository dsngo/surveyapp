import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

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
    width: "100%"
  },
};

class RadioQuestion extends React.Component<
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
        <FormControl className={classes.container} component="fieldset" required={!answers}>
          <FormLabel component="legend">Please choice one</FormLabel>
          <RadioGroup value={answers} onChange={this.handleChange}>
            {options.map((choice: any) => (
              <FormControlLabel
                key={choice.id}
                className={classes.item}
                value={choice.text}
                control={<Radio />}
                label={choice.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles as any)(RadioQuestion);
