import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { clearSubmitStatus, getDataFromDbById, saveClientDataToDb } from "./redux/actionCreators";

interface IClientSurveyProps {
  completed: boolean;
  author: { username: string };
  formId: string;
  clientSurveyId: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
  };
  clientSurveyContents: {}[];
  submitStatus: string;
  tempId: string;
  clearSubmitStatus: () => any;
  getDataFromDbById: (id: string) => any;
  saveClientDataToDb: (clientSurveyId: string, completed: boolean) => any;
  getSurveyById: (id: string) => any;
}

class ClientSurveyPreview extends React.Component<IClientSurveyProps, {}> {
  scrollBars: Scrollbars;
  state = {
    openConfirmModal: false,
    openSuccessModal: false,
    actionSave: false, // False: save, True: submit
  };

  componentDidMount() {
    const { props: { tempId, formId } } = this;
    this.props.getDataFromDbById(formId || tempId);
  }

  handleOpenConfirmModal = (open: boolean, completed: boolean) =>
    this.setState(prevState => ({ ...prevState, openConfirmModal: open, actionSave: completed }));

  handleOpenSuccessModal = (open: boolean) => this.setState(prevState => ({ ...prevState, openSuccessModal: open }));

  renderForm = (editable: any) => {

  }
  render() {
    const {
      renderForm,
      handleOpenConfirmModal,
      handleOpenSuccessModal,
      props: { tempId, formId, submitStatus, clearSubmitStatus, saveClientDataToDb, completed },
      state: { openConfirmModal, openSuccessModal },
    } = this;
    if (submitStatus === "Create Client Survey Success") {
      clearSubmitStatus();
      handleOpenSuccessModal(true);
    }
    const actionsConfirmModal = [
      <FlatButton label="Cancel" primary />,
      <FlatButton label="Submit" secondary onClick={() => saveClientDataToDb("", true)} />,
    ];
    const actionsSuccessModal = [
      <Link to={`/survey/${formId || tempId}`}>
        <FlatButton label="Next" primary />{" "}
      </Link>,
      <Link to="/">
        <FlatButton label="Back to index" secondary />
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
          Are you sure you want to submit this survey?
        </Dialog>
        <Dialog actions={actionsSuccessModal} open={openSuccessModal} onRequestClose={() => handleOpenSuccessModal(false)}>
          Submit successfully.
        </Dialog>
        {tempId && renderForm(formId)}
        
        {/* <div className="row survey-form-create">
          <div className="container survey-form" style={{ paddingTop: "15px" }}>
            {tempId && <div className="btn-preview-survey-container" />}
            {submitStatus && <div className="error-message">{submitStatus}</div>}
            {!completed && (
              <div className="btn-submit-survey-container">
                <RaisedButton
                  backgroundColor="#4CAF50"
                  className="btn-save"
                  label="Submit"
                  onClick={() => handleOpenConfirmModal(true, true)}
                />
              </div>
            )}
          </div>
        </div> */}
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state: any) => ({
  completed: state.clientSurveyData.completed,
  formId: state.clientSurveyData.formId,
  clientSurveyId: state.clientSurveyData.clientSurveyId,
  author: state.clientSurveyData.author,
  clientInfo: state.clientSurveyData.clientInfo,
  clientSurveyContents: state.clientSurveyData.contents,
  submitStatus: state.stateStatus.submitStatus,
});

const mapDispatchToProps = (dispatch: any) => ({
  clearSubmitStatus: () => dispatch(clearSubmitStatus()),
  getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
  saveClientDataToDb: (clientSurveyId: string, completed: boolean) => dispatch(saveClientDataToDb(clientSurveyId, completed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientSurveyPreview);
