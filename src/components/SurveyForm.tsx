import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";
import Scrollbars from "react-custom-scrollbars";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import QuestionContainer from "./Questions";
import SurveyInfo from "./SurveyInfo";
import {
  updateStateStatus,
  getDataFromDbById,
  saveFormToDb,
} from "./redux/actionCreators";
import Settings from "./Settings";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    // flexGrow: 1,
    margin: "0 10vw",
  },
};

interface ISurveyFormProps {
  classes: any;
  surveyContents: [any];
  tempId: string;
  submitStatus: string;
  currentPosition: number;
  saveFormToDb: (completed: boolean) => any;
  updateStateStatus: any;
  getDataFromDbById: (id: string) => any;
}

class SurveyForm extends React.Component<ISurveyFormProps, {}> {
  scrollBars!: Scrollbars;
  state = {
    activeTab: 0,
    isModalOpen: false,
    isSubmitting: false,
    isPreview: false,
  };

  componentDidMount() {
    if (this.props.tempId) {
      this.props.getDataFromDbById(this.props.tempId);
    }
  }
  handleUpdateState = (k, v) => () => this.setState({ [k]: v });
  handleSave = (type: string) => () => {
    this.props.saveFormToDb(type === "submit");
    this.handleUpdateState("isModalOpen", false);
  };
  handleSubmit = () => {
    this.setState({ isSubmitting: true, isModalOpen: true });
  };
  renderQuestion = () => {
    const { surveyContents } = this.props;
    return surveyContents.map((e: any) => (
      <QuestionContainer questionData={e} key={`${e.questionId}`} />
    ));
  };
  renderDialog = isModalOpen => (
    <Dialog
      open={isModalOpen}
      onClose={this.handleUpdateState("isModalOpen", false)}
    >
      <DialogTitle>{`Are you sure you want to ${
        this.state.isSubmitting ? "submit" : "create"
      } this survey?`}</DialogTitle>
      <DialogActions>
        <Button
          color="primary"
          onClick={this.handleUpdateState("isModalOpen", false)}
        >
          Cancel
        </Button>
        {this.state.isSubmitting ? (
          <Button color="secondary" onClick={this.handleSave("submit")}>
            Submit
          </Button>
        ) : (
          <Button color="secondary" onClick={this.handleSave("save")}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
  render() {
    const { classes, submitStatus, tempId, currentPosition } = this.props;
    const { isModalOpen, activeTab } = this.state;
    return (
      <Paper className={classes.root}>
        {this.renderDialog(isModalOpen)}
        <Tabs
          value={activeTab}
          onChange={(e: any, v) => this.handleUpdateState("activeTab", v)()}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Survey Form" />
          <Tab label="Preview Form" />
        </Tabs>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={i => this.handleUpdateState("activeTab", i)()}
        >
          <React.Fragment>
            <SurveyInfo />
            {this.renderQuestion()}
          </React.Fragment>
          <Paper>Client Form</Paper>
        </SwipeableViews>
        <Settings />
      </Paper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    surveyContents: state.surveyContents,
    submitStatus: state.stateStatus.submitStatus,
    tempId: state.stateStatus.tempId,
    currentPosition: state.stateStatus.currentPosition,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  saveFormToDb: (completed: boolean) => dispatch(saveFormToDb(completed)),
  updateStateStatus,
  getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(SurveyForm));
