import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import Settings from "./Settings";
import SurveyInfo from "./clientSurvey/SurveyInfo";
import { saveFormToDb, clearSubmitStatus, getDataFromDbById, saveClientDataToDb } from "./redux/actionCreators";
// Import question components
import AddQuestionComponent from "./clientSurvey/AddQuestionComponent";

interface IClientSurveyProps {
  match: any;
  saveFormToDb: (completed: boolean) => any;
  clearSubmitStatus: () => any;
  surveyInfo: any;
  surveyContents: any[];
  currentIndex: number;
  submitStatus: string;
  updateInfoSurvey: (field: string, value: string) => any;
  getDataFromDbById: (id: string) => any;
  saveClientDataToDb: (clientSurveyId: string, completed: boolean) => any;
  saveSurvey: () => any;
  clearMessage: () => any;
  getSurveyById: (id: string) => any;
  clearSurvey: () => any;
  tempId: string;
  clientSurveyContents: any[];
  test: any;
}

class ClientSurvey extends React.Component<IClientSurveyProps> {
  static defaultProps = {
    surveyInfo: { formId: "123test" }
  };
  scrollBars: Scrollbars;
  state = {
    openConfirmModal: false,
    openSuccessModal: false,
    currentTab: "question",
    completed: false,
    actionSave: false // False: save, True: submit
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getDataFromDbById(this.props.match.params.id);
    }    
  }

  handleChangeCurrentTab = (currentTab: any) =>
    this.setState(prevState => ({ ...prevState, currentTab }));

  handleOpenConfirmModal = (open: boolean, completed: boolean) =>
    this.setState(prevState => ({ ...prevState, openConfirmModal: open, actionSave: completed }));

  handleOpenSuccessModal = (open: boolean) =>
    this.setState(prevState => ({ ...prevState, openSuccessModal: open, openConfirmModal: false }));

  renderQuestion() {
    if (this.props.match.params.id && this.props.clientSurveyContents) {
      return this.props.clientSurveyContents.map((content, index) => (
        <AddQuestionComponent questionData={content} questionIndex={index} key={index} />
      ));
    }
    return this.props.surveyContents.map((content, index) => (
      <AddQuestionComponent questionData={content} questionIndex={index} key={index} isPreview={ true }/>
    ));
  }
  render() {
    if (this.props.submitStatus === "Create Client Survey Success") {
      this.props.clearSubmitStatus();
      this.handleOpenSuccessModal(true);
    }
    const actionsConfirmModal = [
      <FlatButton label="Cancel" primary />,
      <FlatButton
        label="Submit"
        secondary
        onClick={() => this.props.saveClientDataToDb("", true)}
      />
    ];
    const actionsSuccessModal = [
    <Link to={ `/survey/${this.props.tempId}` } > <FlatButton label="Next" primary /></Link>,
    <Link to="/"> <FlatButton label="Back to index" primary/></Link>
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
          Are you sure to submit this response?
        </Dialog>
        <Dialog
          actions={actionsSuccessModal}
          open={this.state.openSuccessModal}
          onRequestClose={() => this.handleOpenSuccessModal(false)}
        >
          Submit successfully.
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
            {this.props.surveyInfo.formId ? (
              <div className="btn-preview-survey-container">
              </div>
            ) : (
              <div />
            )}
            {this.state.completed ? (
              <div />
            ) : (
              <div>
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

            {this.props.submitStatus ? (
              <div className="error-message">{this.props.submitStatus}</div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Scrollbars>
    );
  }
}
// const ClientSurvey: React.SFC<IClientSurvey> = props => {
//     const { surveyData, updateInfoSurvey, saveSurvey } = props;

// };

const mapStateToProps = (state: any) => ({
  test: state,
  surveyInfo: state.surveyInfo,
  surveyContents: state.surveyContents,
  currentIndex: state.stateStatus.currentIndex,
  submitStatus: state.stateStatus.submitStatus,
  tempId: state.stateStatus.tempId,
  clientSurveyContents: state.clientSurveyData.contents
});

const mapDispatchToProps = (dispatch: any) => ({
  saveFormToDb: (completed: boolean) => dispatch(saveFormToDb(completed)),
  clearSubmitStatus: () => dispatch(clearSubmitStatus()),
  getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
  saveClientDataToDb: (clientSurveyId: string, completed: boolean) => dispatch(saveClientDataToDb(clientSurveyId, completed))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSurvey);
