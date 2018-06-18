// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
// import * as React from "react";
// import Scrollbars from "react-custom-scrollbars";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import ClientInfoComponent from "./clientSurvey/ClientInfoComponent";
// // import Settings from "./Settings";
// import SurveyInfo from "./clientSurvey/SurveyInfo";
// // Import question components
// import QuestionContainer from "./questionComponents/QuestionContainer";
// import { clearSubmitStatus, getDataFromDbById, saveClientDataToDb } from "./redux/actionCreators";

// interface IClientSurveyProps {
//   surveyInfo: any;
//   surveyContents: any[];
//   submitStatus: string;
//   tempId: string;
//   clientContents: any[];
//   clearSubmitStatus: () => any;
//   getDataFromDbById: (id: string) => any;
//   saveClientDataToDb: (clientSurveyId: string, completed: boolean) => any;
// }

// class ClientSurvey extends React.Component<IClientSurveyProps> {
//   static defaultProps = {
//     surveyInfo: { formId: "123test" },
//   };
//   scrollBars!: Scrollbars;
//   state = {
//     openConfirmModal: false,
//     openSuccessModal: false,
//     currentTab: "question",
//     completed: false,
//     actionSave: false, // False: save, True: submit
//   };

//   componentDidMount() {
//     if (this.props.tempId) {
//       this.props.getDataFromDbById(this.props.tempId);
//     }
//   }
//   handleChangeCurrentTab = (currentTab: any) =>
//     this.setState(prevState => ({ ...prevState, currentTab }));
//   handleOpenConfirmModal = (open: boolean, completed: boolean) =>
//     this.setState(prevState => ({
//       ...prevState,
//       openConfirmModal: open,
//       actionSave: completed,
//     }));
//   handleOpenSuccessModal = (open: boolean) =>
//     this.setState(prevState => ({
//       ...prevState,
//       openSuccessModal: open,
//       openConfirmModal: false,
//     }));
//   renderQuestion() {
//     if (this.props.tempId && this.props.clientContents) {
//       return this.props.clientContents.map((content, index) => (
//         <QuestionContainer questionData={content} key={index} />
//       ));
//     }
//     return this.props.surveyContents.map((content, index) => (
//       <QuestionContainer questionData={content} key={index} />
//     ));
//   }
//   render() {
//     if (this.props.submitStatus === "Create Client Survey Success") {
//       this.props.clearSubmitStatus();
//       this.handleOpenSuccessModal(true);
//     }
//     return (
//       <Scrollbars
//         id="scroll-survey-form"
//         ref={(bar: any) => {
//           this.scrollBars = bar;
//         }}
//         style={{ height: "calc(100vh - 65px)", width: "100%" }}
//         autoHide
//       >
//         <Dialog
//           open={this.state.openConfirmModal}
//           onClose={() => this.handleOpenConfirmModal(false, false)}
//         >
//           <DialogTitle>Are you sure to submit this response?</DialogTitle>
//           <DialogActions>
//             <Button color="primary">Cancel</Button>
//             <Button
//               color="secondary"
//               onClick={() => this.props.saveClientDataToDb("", true)}
//             >
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog
//           open={this.state.openSuccessModal}
//           onClose={() => this.handleOpenSuccessModal(false)}
//         >
//           <DialogTitle>Submit successfully.</DialogTitle>
//           <DialogActions>
//             <Link to={`/survey/${this.props.tempId}`}>
//               <Button color="primary">Next</Button>
//             </Link>
//             <Link to="/">
//               <Button color="primary">Back to index</Button>
//             </Link>
//           </DialogActions>
//         </Dialog>

//         <div className="row survey-form-create">
//           <div className="container survey-form" style={{ paddingTop: "15px" }}>
//             <div className="form-create clear-fix">
//               <Tabs
//                 value={this.state.currentTab}
//                 onChange={this.handleChangeCurrentTab}
//               >
//                 <Tab label="Form" value="question">
//                   <SurveyInfo />
//                   <ClientInfoComponent />
//                   {this.renderQuestion()}
//                 </Tab>
//               </Tabs>
//             </div>
//             {this.props.surveyInfo.formId ? (
//               <div className="btn-preview-survey-container" />
//             ) : (
//               <div />
//             )}
//             {this.state.completed ? (
//               <div />
//             ) : (
//               <div>
//                 <div className="btn-submit-survey-container">
//                   <Button
//                     color="secondary"
//                     onClick={() => this.handleOpenConfirmModal(true, true)}
//                   >
//                     Submit
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {this.props.submitStatus ? (
//               <div className="error-message">{this.props.submitStatus}</div>
//             ) : (
//               <div />
//             )}
//           </div>
//         </div>
//       </Scrollbars>
//     );
//   }
// }

// const mapStateToProps = (state: any) => ({
//   surveyInfo: state.surveyInfo,
//   surveyContents: state.surveyContents,
//   submitStatus: state.stateStatus.submitStatus,
//   tempId: state.stateStatus.tempId,
//   clientContents: state.clientSurveyData.contents,
// });
// const mapDispatchToProps = (dispatch: any) => ({
//   clearSubmitStatus: () => dispatch(clearSubmitStatus()),
//   getDataFromDbById: (id: string) => dispatch(getDataFromDbById(id)),
//   saveClientDataToDb: (clientSurveyId: string, completed: boolean) =>
//     dispatch(saveClientDataToDb(clientSurveyId, completed)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ClientSurvey);
