import * as React from "react";
import { updateQuestionDetail, addAnswer, updateAnswer, removeAnswer, toggleAnswerChecker } from "../redux/actionCreators";
import { IMultipleChoices } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Checkbox from "material-ui/Checkbox";

class MultipleChoicesQuestion extends React.Component<
  {
    questionData: any;
    isRenderClient?: boolean;
    updateQuestionDetail: (questionId: number, detailKey: string, value: any) => any;
    addAnswer: (questionId: number, newAnswer: any) => any;
    updateAnswer: (questionId: number, answerId: number, answerKey: string, value: any) => any;
    removeAnswer: (questionId: number, answerId: number) => any;
    toggleAnswerChecker: (questionId: number, answerId: number, answerKey: string) => any;
  },
  {}
> {
  renderFormCreate = () => {
    const {
      updateQuestionDetail,
      addAnswer,
      updateAnswer,
      removeAnswer,
      toggleAnswerChecker,
      questionData: { questionId, question, answers, description },
    } = this.props;
    return (
      <div>
        <div className="padding-25-except-top input-option-create">
          <TextField
            name="questionText"
            hintText="Multiple choices question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => updateQuestionDetail(questionId, "question", e.target.value)}
            floatingLabelText="Question"
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => updateQuestionDetail(questionId, "description", e.target.value)}
            floatingLabelText="Description"
          />
          <div className="clear-fix multiple-answer">
            {answers.map((answer: any, answerIndex: number) => {
              return (
                <div className="radio-answer" key={answerIndex}>
                  {answers.length > 1 && (
                    <div>
                      <div className="delete-area" onClick={() => removeAnswer(questionId, answerIndex)}>
                        <i className="fa fa-times" />
                      </div>
                    </div>
                  )}
                  <div className="check-box">
                    <Checkbox
                      onCheck={e => {
                        toggleAnswerChecker(questionId, answerIndex, "correct");
                      }}
                    />
                  </div>
                  <div className="icon-radio clear-fix">
                    <i className="material-icons">radio_button_checked</i>
                  </div>
                  <div className="input-field input-text-radio">
                    <TextField
                      name="answerText"
                      hintText="Add an answer here."
                      fullWidth
                      value={answer.answer}
                      onChange={(e: any) => updateAnswer(questionId, answerIndex, "answer", e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="radio-answer align-center">
              <FloatingActionButton mini onClick={e => addAnswer(questionId, { correct: false, text: "", checked: false })}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderFormClient() {
    const { questionData: { questionId, question, description, answers }, toggleAnswerChecker } = this.props;
    return (
      <div className="input-option-create">
        <div className="question-info">
          <div className="question">{question}</div>
          <div className="description">{description}</div>
        </div>
        <div className="padding-25">
          {answers.map((answer: any, answerId: number) => (
            <RadioButton
              key={`MTC-ans${answerId}`}
              label={answer.text}
              onClick={toggleAnswerChecker(questionId, answerId, "checked")}
              checked={answer.checked}
            />
          ))}
        </div>
      </div>
    );
  }
  render() {
    const { renderFormCreate, renderFormClient } = this;
    const { isRenderClient } = this.props;
    return <div className="question-component">{isRenderClient ? renderFormClient() : renderFormCreate()}</div>;
  }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  updateQuestionDetail: (questionId: number, detailKey: string, value: any) =>
    dispatch(updateQuestionDetail(questionId, detailKey, value)),
  addAnswer: (questionId: number, newAnswer: any) => dispatch(addAnswer(questionId, newAnswer)),
  updateAnswer: (questionId: number, answerId: number, answerKey: string, value: any) =>
    dispatch(updateAnswer(questionId, answerId, answerKey, value)),
  removeAnswer: (questionId: number, answerId: number) => dispatch(removeAnswer(questionId, answerId)),
  toggleAnswerChecker: (questionId: number, answerId: number, answerKey: string) =>
    dispatch(toggleAnswerChecker(questionId, answerId, answerKey)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoicesQuestion);
