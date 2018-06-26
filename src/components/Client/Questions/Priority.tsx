import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

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
  selectField: {
    display: "flex",
    justifyContent: "center"
  }
};

class PriorityQuestion extends React.Component<
  {
    classes: any;
    questionData: any;
    onChangeContent: (questionId: any, detailKey: string, value: any) => any;
  },
  {}
> {
  handleChange = key => e => {
    const { questionId, answers, options } = this.props.questionData;
    console.log(questionId, key, e.target.value)
    this.props.onChangeContent(questionId, "answers", {
      ...answers,
      [key]: e.target.value,
    });
  };
  findDuplicate = () => {
    const { answers } = this.props.questionData;
    const keys = Object.values(answers);
    return keys.some((e, i) => keys.indexOf(e) !== i);
  };

  render() {
    const {
      classes,
      questionData: { questionId, question, options, description, answers },
    } = this.props;
    const choices = options.map(e => e.key);
    return (
      <div className={classes.root}>
        {options.map((e, i) => (
          <Typography key={e.id}>
            {e.key} - {e.text}
          </Typography>
        ))}
        <div className={classes.selectField}>
          {options.map((e, i) => (
            <TextField
              key={e.id}
              select
              value={answers[`priority${i + 1}`]}
              onChange={this.handleChange(`priority${i + 1}`)}
              margin="normal"
              style={{ width: 90 }}
              helperText={`${i + 1} priority`}
            >
              {choices.map(c => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          ))}
        </div>
        {this.findDuplicate() && (
          <Typography color="error">
            Please only select each option once *
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles as any)(PriorityQuestion);
