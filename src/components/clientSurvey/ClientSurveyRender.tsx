import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { clearSubmitStatus, getDataFromDbById, saveClientDataToDb } from "./redux/actionCreators";
import MultipleChoicesQuestion from "./MultipleChoicesQuestion";
import MultipleDropdownQuestion from "./MultipleDropdownQuestion";
import PriorityQuestion from "./PriorityQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import ShortQuestion from "./ShortQuestion";
import DropdownQuestion from "./DropdownQuestion";
import LongQuestion from "./LongQuestion";

interface ICSRProps {
  surveyInfo: any;
  surveyContents: any[];
  formId?: string;
}

const ClientSurveyRender: React.SFC<ICSRProps> = props => {
  const { surveyInfo, surveyContents, formId } = props;
  return (
    <div>
      {surveyContents.map(
        (e, i) =>
          (e.questionType === "longQuestion" && <LongQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "shortQuestion" && <ShortQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "multipleChoices" && <MultipleChoicesQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "dropdown" && <DropdownQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "multipleDropdown" && <MultipleDropdownQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "checkbox" && <CheckboxQuestion {...{ questionIndex: i, questionData: e }} />) ||
          (e.questionType === "priorityQuestion" && <PriorityQuestion {...{ questionIndex: i, questionData: e }} />),
      )}
    </div>
  );
};

// class zzzzz extends React.Component<ICSRProps, {}> {
//   scrollBars: Scrollbars;
//   state = {
//     openConfirmModal: false,
//     openSuccessModal: false,
//     actionSave: false, // False: save, True: submit
//   };

//   componentDidMount() {
//     const { props: { tempId, formId } } = this;
//     this.props.getDataFromDbById(formId || tempId);
//   }

//   handleOpenConfirmModal = (open: boolean, completed: boolean) =>
//     this.setState(prevState => ({ ...prevState, openConfirmModal: open, actionSave: completed }));

//   handleOpenSuccessModal = (open: boolean) => this.setState(prevState => ({ ...prevState, openSuccessModal: open }));

//   renderForm = (editable: any) => {

//   }
//   render() {
//     const {
//       renderForm,
//       handleOpenConfirmModal,
//       handleOpenSuccessModal,
//       props: { tempId, formId, submitStatus, clearSubmitStatus, saveClientDataToDb, completed },
//       state: { openConfirmModal, openSuccessModal },
//     } = this;
//     if (submitStatus === "Create Client Survey Success") {
//       clearSubmitStatus();
//       handleOpenSuccessModal(true);
//     }
//     const actionsConfirmModal = [
//       <FlatButton label="Cancel" primary />,
//       <FlatButton label="Submit" secondary onClick={() => saveClientDataToDb("", true)} />,
//     ];
//     const actionsSuccessModal = [
//       <Link to={`/survey/${formId || tempId}`}>
//         <FlatButton label="Next" primary />{" "}
//       </Link>,
//       <Link to="/">
//         <FlatButton label="Back to index" secondary />
//       </Link>,
//     ];
//     return (
//       <Scrollbars
//         id="scroll-survey-form"
//         ref={(bar: any) => {
//           this.scrollBars = bar;
//         }}
//         style={{ height: "calc(100vh - 65px)", width: "100%" }}
//         autoHide
//       >
//         <Dialog actions={actionsConfirmModal} open={openConfirmModal} onRequestClose={() => handleOpenConfirmModal(false, false)}>
//           Are you sure you want to submit this survey?
//         </Dialog>
//         <Dialog actions={actionsSuccessModal} open={openSuccessModal} onRequestClose={() => handleOpenSuccessModal(false)}>
//           Submit successfully.
//         </Dialog>
//         {tempId && renderForm(formId)}

//         {/* <div className="row survey-form-create">
//           <div className="container survey-form" style={{ paddingTop: "15px" }}>
//             {tempId && <div className="btn-preview-survey-container" />}
//             {submitStatus && <div className="error-message">{submitStatus}</div>}
//             {!completed && (
//               <div className="btn-submit-survey-container">
//                 <RaisedButton
//                   backgroundColor="#4CAF50"
//                   className="btn-save"
//                   label="Submit"
//                   onClick={() => handleOpenConfirmModal(true, true)}
//                 />
//               </div>
//             )}
//           </div>
//         </div> */}
//       </Scrollbars>
//     );
//   }
// }

// const mapStateToProps = (state: any) => ({
//   completed: state.clientSurveyData.completed,
//   formId: state.clientSurveyData.formId,
//   clientSurveyId: state.clientSurveyData.clientSurveyId,
//   author: state.clientSurveyData.author,
//   clientInfo: state.clientSurveyData.clientInfo,
//   clientSurveyContents: state.clientSurveyData.contents,
//   submitStatus: state.stateStatus.submitStatus,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   clearSubmitStatus: () => dispatch(clearSubmitStatus()),
//   getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
//   saveClientDataToDb: (clientSurveyId: string, completed: boolean) => dispatch(saveClientDataToDb(clientSurveyId, completed)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(zzzzz);
