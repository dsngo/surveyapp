// import * as React from "react";
// import {
//     changeQuestion,
//     changeTypeAnswer,
//     chooseArea,
//     deleteArea,
//     updateDescriptionArea,
// } from "./redux/actionCreators";
// import { connect } from "react-redux";
// import MenuItem from "material-ui/MenuItem";
// import QuestionOptions from "./AnswerOption";
// import SelectField from "material-ui/SelectField";
// import TextField from "material-ui/TextField";


// interface IAreaList {
//     surveyData: any;
//     currentArea: number;
//     chooseArea: (index: number) => any;
//     deleteArea: (index: number) => any;
//     changeTypeAnswer: (index: number, questionType: string) => any;
//     updateDescriptionArea: (index: number, field: string, value: string) => any;
//     changeQuestion: (index: number, value: string) => any;
// }

// const CreateSurveyAreaList: React.SFC<IAreaList> = props => {
//     const { surveyData, currentArea, chooseArea, deleteArea, changeTypeAnswer, updateDescriptionArea, changeQuestion } = props;
//     let indexQuestion = 0;
//     return (
//         <div>
//             {surveyData.content.map((area: any, index: any) => {
//                 console.log(area);

//                 let classActive = index === currentArea ? "active-area" : "";
//                 if (area.type === "question") {
//                     indexQuestion += 1;
//                     classActive += " form-question";
//                     return (
//                         <div key={index} className={classActive} onClick={e => chooseArea(index)}>
//                             <div>
//                                 <div className="delete-area" onClick={e => deleteArea(index)}>
//                                     <i className="fa fa-times" />
//                                 </div>
//                             </div>
//                             <TextField
//                                 name="question_text"
//                                 hintText=""
//                                 fullWidth={true}
//                                 value={surveyData.content[index].question}
//                                 onChange={(e: any) => changeQuestion(index, e.target.value)}
//                                 floatingLabelText={"Question " + indexQuestion}
//                             />
//                             <SelectField
//                                 floatingLabelText="Answer"
//                                 fullWidth={true}
//                                 value={area.questionType}
//                                 onChange={(event: object, key: number, payload: any) => {
//                                     changeTypeAnswer(index, payload);
//                                 }}
//                                 className="mui-select"
//                             >
//                                 <MenuItem value="shortQuestion" label="Short answer">
//                                     Short answer
//                                 </MenuItem>
//                                 <MenuItem value="longQuestion" label="Long answer">
//                                     Long answer
//                                 </MenuItem>
//                                 <MenuItem value="checkbox" label="Checkbox">
//                                     Checkbox
//                                 </MenuItem>
//                                 <MenuItem value="multipleChoices" label="Multiple choice">
//                                     Multiple choice
//                                 </MenuItem>
//                                 <MenuItem value="dropdown" label="Dropdown">
//                                     Dropdown
//                                 </MenuItem>
//                                 <MenuItem value="priority" label="Priority">
//                                     Priority
//                                 </MenuItem>
//                                 <MenuItem value="multiDropdown" label="Priority">
//                                     Multiple dropdown
//                                 </MenuItem>
//                             </SelectField>
//                             <QuestionOptions area={area} index={index} />
//                         </div>
//                     );
//                 }
//                 {/* if (area.type === "description") {
//                     classActive += " form-info";
//                     return (
//                         <div key={index} className={classActive} onClick={e => chooseArea(index)}>
//                             <div>
//                                 <div className="delete-area" onClick={e => deleteArea(index)}>
//                                     <i className="fa fa-times" />
//                                 </div>
//                             </div>
//                             <div className="form-title">
//                                 <TextField
//                                     name="question_text"
//                                     hintText=""
//                                     fullWidth={true}
//                                     onChange={(e: any) => updateDescriptionArea(index, "title", e.target.value)}
//                                     floatingLabelText="Title"
//                                 />
//                             </div>
//                             <div className="form-description">
//                                 <TextField
//                                     name="question_text"
//                                     hintText=""
//                                     fullWidth={true}
//                                     onChange={(e: any) => updateDescriptionArea(index, "description", e.target.value)}
//                                     floatingLabelText="Description"
//                                 />
//                             </div>
//                         </div>
//                     );
//                 } */}
//             })}
//         </div>
//     );
// };

// const mapStateToProps = (state: any) => ({
//     surveyData: state.surveyData,
//     currentArea: state.currentArea,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     changeTypeAnswer: (index: number, questionType: string) => dispatch(changeTypeAnswer(index, questionType)),
//     deleteArea: (index: number) => dispatch(deleteArea(index)),
//     chooseArea: (index: number) => dispatch(chooseArea(index)),
//     updateDescriptionArea: (index: number, field: string, value: string) => dispatch(updateDescriptionArea(index, field, value)),
//     changeQuestion: (index: number, value: string) => dispatch(changeQuestion(index, value)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyAreaList);
