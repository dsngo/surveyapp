import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import Settings from "./Settings";
import SurveyInfo from "./questionComponents/SurveyInfo";
import { saveFormToDb, clearSubmitStatus, getDataFromDbById } from "./redux/actionCreators";
// Import question components
import MultipleDropdownQuestion from "./questionComponents/MultipleDropdownQuestion";
import ShortQuestion from "./questionComponents/ShortQuestion";
import CheckboxQuestion from "./questionComponents/CheckboxQuestion";
import DropdownQuestion from "./questionComponents/DropdownQuestion";
import LongQuestion from "./questionComponents/LongQuestion";
import MultipleChoicesQuestion from "./questionComponents/MultipleChoicesQuestion";
import PriorityQuestion from "./questionComponents/PriorityQuestion";
import AddQuestionComponent from "./questionComponents/AddQuestionComponent";

interface ISurveyFormProps {
  surveyId: string;
  saveFormToDb: (completed: boolean) => any;
  clearSubmitStatus: () => any;
  surveyContents: any[];
  submitStatus: string;
  updateInfoSurvey: (field: string, value: string) => any;
  saveSurvey: () => any;
  clearMessage: () => any;
  getSurveyById: (id: string) => any;
  getDataFromDbById: () => any;
  clearSurvey: () => any;
  tempId: string;
  match: any;
}

class SurveyForm extends React.Component<ISurveyFormProps> {
  scrollBars: Scrollbars;
  tempLengthArea = 0;
  state = {
    openConfirmModal: false,
    openSuccessModal: false,
    currentTab: "question",
    completed: false,
    actionSave: false, // False: save, True: submit
    tempIdState: ""
  };

  componentDidUpdate() {
    const sLen = this.props.surveyContents.length;
    if (sLen > this.tempLengthArea) {
      this.scrollBars.scrollToBottom();
      this.tempLengthArea = sLen;
    }
    
    if (this.state.tempIdState === "" && this.props.tempId) {

    }
  }
  componentDidMount() {
    if (this.props.tempId) {
      this.props.getDataFromDbById();
    }
  }
  handleChangeCurrentTab = (currentTab: any) =>
    this.setState(prevState => ({ ...prevState, currentTab }));

  handleOpenConfirmModal = (open: boolean, completed: boolean) =>
    this.setState(prevState => ({ ...prevState, openConfirmModal: open, actionSave: completed }));

  handleOpenSuccessModal = (open: boolean) =>
    this.setState(prevState => ({ ...prevState, openSuccessModal: open, openConfirmModal: false }));

  renderQuestion() {
    return this.props.surveyContents.map((content, index) => (
      <AddQuestionComponent questionData={content} questionIndex={index} />
    ));
  }
  render() {
    if (this.props.submitStatus === "Success") {
      this.props.clearSubmitStatus();
      this.handleOpenSuccessModal(true);
    }
    const actionsConfirmModal = [
      <FlatButton label="Cancel" primary />,
      <FlatButton
        label="Submit"
        secondary
        onClick={() => this.props.saveFormToDb(this.state.actionSave)}
      />
    ];
    const actionsSuccessModal = [
    <FlatButton label="Next" primary onClick={ () => this.handleOpenSuccessModal(false)} />,
    <Link to="/"><FlatButton label="Back to index"  primary onClick={ () => this.handleOpenSuccessModal(false)}/></Link>
  ];
    return (
      <Scrollbars
        id="scroll-survey-form"
        ref={(bar: any) => {
          this.scrollBars = bar;
        }}
        style={{ height: "calc(100vh - 65px)", width: "100%" }}
        autoHide
      >
        <Dialog
          actions={actionsConfirmModal}
          open={this.state.openConfirmModal}
          onRequestClose={() => this.handleOpenConfirmModal(false, false)}
        >
          Are you sure you want to create this survey?
        </Dialog>
        <Dialog
          actions={actionsSuccessModal}
          open={this.state.openSuccessModal}
          onRequestClose={() => this.handleOpenSuccessModal(false)}
        >
          Create survey successfully.
        </Dialog>

        <div className="row survey-form-create">
          <div className="container survey-form" style={{ paddingTop: "15px" }}>
            <div className="form-create clear-fix">
              <Tabs
                value={this.state.currentTab}
                onChange={this.handleChangeCurrentTab}
              >
                <Tab label="Form" value="question">
                  <SurveyInfo />
                  {this.renderQuestion()}
                </Tab>
              </Tabs>
            </div>
            {this.state.completed ? (
              <div />
            ) : (
              <div>
                <div className="btn-save-survey-container">
                  <RaisedButton
                    backgroundColor="#4CAF50"
                    className="btn-save"
                    label="Save"
                    onClick={() => this.handleOpenConfirmModal(true, false)}
                  />
                </div>
                <div className="btn-submit-survey-container">
                  <RaisedButton
                    backgroundColor="#4CAF50"
                    className="btn-save"
                    label="Submit"
                    onClick={() => this.handleOpenConfirmModal(true, true)}
                  />
                </div>
              </div>
            )}

            {/* {this.props.submitStatus ? (
              <div className="error-message">{this.props.submitStatus}</div>
            ) : (
              <div />
            )} */}
          </div>
        </div>
        <Settings />
      </Scrollbars>
    );
  }
}
// const SurveyForm: React.SFC<ISurveyForm> = props => {
//     const { surveyData, updateInfoSurvey, saveSurvey } = props;

// };

const mapStateToProps = (state: any) => ({
  surveyContents: [...state.surveyContents],
  submitStatus: state.stateStatus.submitStatus,
  tempId: state.stateStatus.tempId
});

const mapDispatchToProps = (dispatch: any) => ({
  saveFormToDb: (completed: boolean) => dispatch(saveFormToDb(completed)),
  clearSubmitStatus: () => dispatch(clearSubmitStatus()),
  getDataFromDbById: () => dispatch(getDataFromDbById())
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
