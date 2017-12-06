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
  tempId: string;
  surveyId: string;
  surveyContents: any[];
  submitStatus: string;
  saveFormToDb: (completed: boolean) => any;
  clearSubmitStatus: () => any;
  updateInfoSurvey: (field: string, value: string) => any;
  saveSurvey: () => any;
  clearMessage: () => any;
  getSurveyById: (id: string) => any;
  getDataFromDbById: (id: string) => any;
  clearSurvey: () => any;
}

class SurveyForm extends React.Component<ISurveyFormProps, {}> {
  scrollBars: Scrollbars;
  tempLengthArea = 0;
  state = {
    openConfirmModal: false,
    openSuccessModal: false,
    actionSave: false, // False: save, True: submit
    surveyContents: [],
  };

  // Life Cycle Methods
  componentWillReceiveProps(nextProps: any) {
    if (this.props.surveyContents) {
      this.setState(prevState => ({ ...prevState, surveyContents: nextProps.surveyContents }));
    }
  }
  componentDidMount() {
    if (this.props.tempId) {
      this.props.getDataFromDbById(this.props.tempId);
    }
  }

  // Action Methods
  handleOpenConfirmModal = (open: boolean, completed: boolean) =>
    this.setState(prevState => ({ ...prevState, openConfirmModal: open, actionSave: completed }));

  handleOpenSuccessModal = (open: boolean) =>
    this.setState(prevState => ({ ...prevState, openSuccessModal: open, openConfirmModal: false }));

  handleSaveFormToDb = (actionSave: boolean) => {
    this.props.saveFormToDb(actionSave);
    this.handleOpenConfirmModal(false, false);
  };

  // Render Methods
  renderQuestion = () => {
     return this.state.surveyContents.map((content, index) => (
      <AddQuestionComponent questionData={content} questionIndex={index} key={`AddQC-${index}`} />
    ));
  };

  render() {
    const {
      handleOpenConfirmModal,
      handleOpenSuccessModal,
      handleSaveFormToDb,
      props: { submitStatus, tempId, clearSubmitStatus },
      state: { surveyContents, openConfirmModal, openSuccessModal, actionSave },
    } = this;

    if (submitStatus === "Success") {
      clearSubmitStatus();
      handleOpenSuccessModal(true);
    }
    const actionsConfirmModal = [
      <FlatButton label="Cancel" primary onClick={() => handleOpenConfirmModal(false, false)} />,
      <FlatButton label="Submit" secondary onClick={() => handleSaveFormToDb(actionSave)} />,
    ];
    const actionsSuccessModal = [
      <FlatButton label="Next" primary onClick={() => handleOpenSuccessModal(false)} />,
      <Link to="/">
        <FlatButton label="Back to index" primary onClick={() => handleOpenSuccessModal(false)} />
      </Link>,
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
        <Dialog actions={actionsConfirmModal} open={openConfirmModal} onRequestClose={() => handleOpenConfirmModal(false, false)}>
          Are you sure you want to create this survey?
        </Dialog>
        <Dialog actions={actionsSuccessModal} open={openSuccessModal} onRequestClose={() => handleOpenSuccessModal(false)}>
          Create survey successfully.
        </Dialog>
        <div className="row survey-form-create">
          <div className="container survey-form" style={{ paddingTop: "15px" }}>
            <div className="form-create clear-fix">
              <Tabs value="question">
                <Tab label="Form" value="question">
                  <SurveyInfo />
                  {this.renderQuestion()}
                </Tab>
              </Tabs>
            </div>
            <div>
              <div className="btn-preview-survey-container">
                <Link to="/survey/preview">
                  <RaisedButton
                    backgroundColor="#4CAF50"
                    className="btn-save"
                    label="Preview"
                    onClick={() => handleOpenConfirmModal(true, false)}
                  />
                </Link>
              </div>
              <div className="btn-save-survey-container">
                <RaisedButton
                  backgroundColor="#4CAF50"
                  className="btn-save"
                  label="Save"
                  onClick={() => handleOpenConfirmModal(true, false)}
                />
              </div>
              <div className="btn-submit-survey-container">
                <RaisedButton
                  backgroundColor="#4CAF50"
                  className="btn-save"
                  label="Submit"
                  onClick={() => handleOpenConfirmModal(true, true)}
                />
              </div>
            </div>
          </div>
        </div>
        <Settings />
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state: any) => ({
  surveyContents: state.surveyContents,
  submitStatus: state.stateStatus.submitStatus,
  tempId: state.stateStatus.tempId,
});

const mapDispatchToProps = (dispatch: any) => ({
  saveFormToDb: (completed: boolean) => dispatch(saveFormToDb(completed)),
  clearSubmitStatus: () => dispatch(clearSubmitStatus()),
  getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
