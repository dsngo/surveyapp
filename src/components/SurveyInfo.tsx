import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { connect } from "react-redux";
import { updateSurveyInfo } from "./redux/actionCreators";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const styles = {
  root: {
    // padding: 10,
    margin: 5,
  },
  content: {
    padding: 10,
    margin: "0 15vw 5px",
  },
};

const SurveyInfo = ({ classes, title, description, updateSurveyInfo }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e: any) => updateSurveyInfo("title", e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Description"
          value={description}
          onChange={(e: any) => updateSurveyInfo("description", e.target.value)}
        />
      </div>
      <Divider light />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  title: state.surveyInfo.title,
  description: state.surveyInfo.description,
});

const mapDispatchToProps = {
  updateSurveyInfo,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SurveyInfo));
