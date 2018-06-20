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
import InfoTab from "./InfoTab";
import {
  updateStateStatus,
  getFormDataById,
  saveFormToDb,
  createNewForm,
} from "../redux/actionCreators";
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
  match: any;
  formQuestions: [any];
  submitStatus: string;
  currentPosition: number;
  createNewForm: () => any;
  saveFormToDb: (completed: boolean) => any;
  updateStateStatus: any;
  getFormDataById: (id: string) => any;
}

class SurveyForm extends React.Component<ISurveyFormProps, {}> {
  scrollBars!: Scrollbars;
  state = {
    activeTab: 0,
    isDialogOpen: false,
    isSubmitting: false,
    isPreview: false,
  };

  componentDidMount() {
    if (this.props.match.params.activeId) {
      if (this.props.match.params.activeId === "create") this.props.createNewForm();
      this.props.getFormDataById(this.props.match.params.activeId);
    }
  }
  handleUpdateState = (k, v) => () => this.setState({ [k]: v });
  handleSave = (type: string) => () => {
    this.props.saveFormToDb(type === "submit");
    this.handleUpdateState("isDialogOpen", false);
  };
  handleSubmit = () => {
    this.setState({ isSubmitting: true, isDialogOpen: true });
  };
  renderQuestion = () => {
    const { formQuestions } = this.props;
    return formQuestions.map((e: any) => (
      <QuestionContainer questionData={e} key={`${e.questionId}`} />
    ));
  };
  renderDialog = isDialogOpen => (
    <Dialog
      open={isDialogOpen}
      onClose={this.handleUpdateState("isDialogOpen", false)}
    >
      <DialogTitle>{`Are you sure you want to ${
        this.state.isSubmitting ? "submit" : "create"
      } this survey?`}</DialogTitle>
      <DialogActions>
        <Button
          color="primary"
          onClick={this.handleUpdateState("isDialogOpen", false)}
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
    const { classes, submitStatus, currentPosition } = this.props;
    const { isDialogOpen, activeTab } = this.state;
    return (
      <Paper className={classes.root}>
        {this.renderDialog(isDialogOpen)}
        <Tabs
          value={activeTab}
          onChange={(e: any, v) => this.handleUpdateState("activeTab", v)()}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Survey Form" />
          {/* <Tab label="Preview Form" /> */}
        </Tabs>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={i => this.handleUpdateState("activeTab", i)()}
        >
          <React.Fragment>
            <InfoTab />
            {this.renderQuestion()}
          </React.Fragment>
          {/* <Paper>Client Form</Paper> */}
        </SwipeableViews>
        <Settings />
      </Paper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    formQuestions: state.formQuestions,
    submitStatus: state.stateStatus.submitStatus,
    currentPosition: state.stateStatus.currentPosition,
  };
};

const mapDispatchToProps = {
  createNewForm,
  saveFormToDb,
  getFormDataById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(SurveyForm));
