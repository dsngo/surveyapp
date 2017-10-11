import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import {
  updateInfoSurvey,
  saveSurvey,
  clearMessage,
  getSurveyById,
} from "./redux/actionCreators";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs } from "material-ui/Tabs";
import MultipleDropdownQuestion from "./questionComponents/MultipleDropdownQuestion";

interface ISurveyFormProps {
  surveyInfo: any;
  surveyContents: any[];
  currentIndex: number;
  submitStatus: string;
  updateInfoSurvey: (field: string, value: string) => any;
  saveSurvey: () => any;
  clearMessage: () => any;
  getSurveyById: (id: string) => any;
  clearSurvey: () => any;
}

class SurveyForm extends React.Component<ISurveyFormProps> {
  static defaultProps = {
    surveyInfo: { formId: "123test" },
  };
  scrollBars: Scrollbars;
  tempLengthArea = 0;
  state = {
    openConfirmModal: false,
    openSuccessModal: false,
    currentTab: "question",
  };

  componentDidUpdate() {
    const sLen = this.props.surveyContents.length;
    if (sLen > this.tempLengthArea) {
      this.scrollBars.scrollToBottom();
      this.tempLengthArea = sLen;
    }
    if (this.props.submitStatus) {
      this.handleOpenSuccessModal(true);
    }
  }
  handleChangeCurrentTab = (currentTab: any) => this.setState(prevState => ({ ...prevState, currentTab }));

  handleOpenConfirmModal = (open: boolean) => this.setState(prevState => ({ ...prevState, openConfirmModal: open }));

  handleOpenSuccessModal = (open: boolean) => this.setState(prevState => ({ ...prevState, openSuccessModal: open }));

  render() {
    const actionsConfirmModal = [
      <FlatButton label="Cancel" primary />,
      <FlatButton label="Submit" secondary onClick={() => this.props.saveSurvey()} />,
    ];
    const actionsSuccessModal = [<FlatButton label="OK" primary />];
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
          onRequestClose={() => this.handleOpenConfirmModal(false)}
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
              <Tabs value={this.state.currentTab} onChange={this.handleChangeCurrentTab}>
                <MultipleDropdownQuestion {...{ questionIndex: 1, questionNumber: 2 }} />
                {/* <Tab label="Question" value="question">
                  <Settings />
                  <div className="form-content">
                    <div className="form-info">
                      <div className="form-title">
                        <TextField
                          name="question_text"
                          hintText=""
                          fullWidth={true}
                          value={this.props.surveyData.info.title}
                          onChange={(e: any) => this.props.updateInfoSurvey("title", e.target.value)}
                          floatingLabelText="Title"
                        />
                      </div>
                      <div className="form-description">
                        <TextField
                          name="question_text"
                          hintText="Put your description here."
                          multiLine={true}
                          rows={2}
                          fullWidth={true}
                          value={this.props.surveyData.info.description}
                          onChange={(e: any) => this.props.updateInfoSurvey("description", e.target.value)}
                          floatingLabelText="Description"
                        />
                      </div>
                    </div>

                    <CreateSurveyAreaList />
                  </div>
                </Tab> */}
                {/* <Tab label="Responses" value="response" /> */}
              </Tabs>
            </div>
            {this.props.surveyInfo.formId ? (
              <div className="btn-preview-survey-container">
                <Link to={`/form/${this.props.surveyInfo.formId}`}>
                  <RaisedButton backgroundColor="#4CAF50" className="btn-save" label="Preview" />
                </Link>
              </div>
            ) : (
              <div />
            )}
            <div className="btn-save-survey-container">
              <RaisedButton
                backgroundColor="#4CAF50"
                className="btn-save"
                label="Save"
                onClick={() => this.handleOpenConfirmModal(true)}
              />
            </div>

            {this.props.submitStatus ? <div className="error-message">{this.props.submitStatus}</div> : <div />}
          </div>
        </div>
      </Scrollbars>
    );
  }
}
// const SurveyForm: React.SFC<ISurveyForm> = props => {
//     const { surveyData, updateInfoSurvey, saveSurvey } = props;

// };

const mapStateToProps = (state: any) => ({
  surveyInfo: state.surveyInfo,
  surveyContents: state.surveyContents,
  currentIndex: state.stateStatus.currentIndex,
  submitStatus: state.stateStatus.submitStatus,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateInfoSurvey: (field: string, value: string) => dispatch(updateInfoSurvey(field, value)),
  saveSurvey: () => dispatch(saveSurvey()),
  clearMessage: () => dispatch(clearMessage()),
  getSurveyById: (id: string) => dispatch(getSurveyById(id)),
  // clearSurvey: () => dispatch(clearSurvey()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
