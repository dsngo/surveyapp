import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { ICheckBox } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";

class CheckboxQuestion extends React.Component<
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
  renderFormClient = () => {
    const { props: { questionData: { questionId, question, answers, description }, toggleAnswerChecker } } = this;
    return (
      <div className="input-option-create">
        <div className="question-field">
          <div className="question-info">
            <div className="question">{question}</div>
            <div className="description">{description}</div>
          </div>
          <div className="answer padding-25">
            {answers.map((answer: any, key: any) => {
              return (
                <div>
                  <Checkbox
                    checked={answer.checked}
                    onCheck={e => {
                      toggleAnswerChecker(questionId, key, "checked");
                    }}
                    label={answer.text}
                    key={`CBAnswer-${key}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  renderFormCreate = () => {
    const {
      props: {
        questionData: { questionId, question, answers, description },
        toggleAnswerChecker,
        addAnswer,
        updateAnswer,
        updateQuestionDetail,
        removeAnswer,
      },
    } = this;
    return (
      <div>
        <div className="input-field input-text-radio input-option-create padding-bottom-25">
          <TextField
            name="questionText"
            hintText="Checkbox Question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => updateQuestionDetail(questionId, "question", e.target.value)}
            floatingLabelText="Question"
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            fullWidth
            value={description}
            onChange={(e: any) => updateQuestionDetail(questionId, "description", e.target.value)}
            floatingLabelText="Description"
          />
          <div className="clear-fix multiple-answer">
            {answers.map((answer: any, answerIndex: number) => {
              return (
                <div className="radio-answer" key={`CBAnswer-${answerIndex}`}>
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
                    <i className="material-icons">check_circle</i>
                  </div>
                  <div className="input-field input-text-radio">
                    <TextField
                      name="answerText"
                      hintText="Add an answer here."
                      fullWidth
                      value={answer.text}
                      onChange={(e: any) => updateAnswer(questionId, answerIndex, "text", e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="radio-answer align-center">
              <RaisedButton
                label="More option"
                primary={true}
                onClick={() => addAnswer(questionId, { correct: false, text: "", checked: false })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="question-component">{this.props.isRenderClient ? this.renderFormClient() : this.renderFormCreate()}</div>
    );
  }
}

export default CheckboxQuestion;
