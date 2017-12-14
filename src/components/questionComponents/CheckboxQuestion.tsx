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
    handleUpdateQuestion: (questionId: number, questionData: any) => any;
  },
  {}
> {
  state = {
    question: "",
    description: "",
    answers: [
      {
        correct: false,
        text: "",
        chosen: false,
      },
    ],
  };
  handleUpdateQuestion = (newQuestion: string) => this.setState((prevState: any) => ({ ...prevState, question: newQuestion }));
  handleUpdateDescription = (newDescription: string) =>
    this.setState((prevState: any) => ({ ...prevState, description: newDescription }));
  handleUpdateAnswer = (answerIndex: number, answerKey: "correct" | "text" | "chosen", updatedValue: any) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (ansObj: any, i: number) => (i === answerIndex ? { ...ansObj, [answerKey]: updatedValue } : ansObj),
      ),
    }));
  handleAddAnswer = () =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.push({ correct: false, text: "", chosen: false }) && prevState.answers,
    }));
  handleRemoveAnswer = (answerIndex: number) => {
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.filter((e: any, i: number) => i !== answerIndex),
    }));
  };
  toggleAnswerChecker = (indexAnswer: number, answerKey: string) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (answer: any, index: number) => (index === indexAnswer ? { ...answer, [answerKey]: answer[answerKey] } : answer),
      ),
    }));

  renderFormCreate = (question: string, description: string, answers: any) => (
    <div>
      <div className="input-field input-text-radio input-option-create padding-bottom-25">
        <TextField
          name="questionText"
          hintText="Long question"
          multiLine
          fullWidth
          value={question}
          onChange={(e: any) => this.handleUpdateQuestion(e.target.value)}
          floatingLabelText="Question"
        />
        <TextField
          name="answerText"
          hintText="Add an answer here."
          fullWidth
          value={description}
          onChange={(e: any) => this.handleUpdateDescription(e.target.value)}
          floatingLabelText="Description"
        />
        <div className="clear-fix multiple-answer">
          {answers.map((answer: any, answerIndex: number) => {
            return (
              <div className="radio-answer" key={answerIndex}>
                {answers.length > 1 && (
                  <div>
                    <div className="delete-area" onClick={() => this.handleRemoveAnswer(answerIndex)}>
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="check-box">
                  <Checkbox
                    onCheck={e => {
                      this.toggleAnswerChecker(answerIndex, "correct");
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
                    onChange={(e: any) => this.handleUpdateAnswer(answerIndex, "text", e.target.value)}
                  />
                </div>
              </div>
            );
          })}
          <div className="radio-answer align-center">
            <RaisedButton label="More option" primary={true} onClick={e => this.handleAddAnswer()} />
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const { props: { questionData: { question, answers, description } } } = this;
    return <div className="question-component">{this.renderFormCreate(question, description, answers)}</div>;
  }

  componentDidUpdate() {
    const { question, answers, description } = this.state;
    const { questionType, questionId, position, completed } = this.props.questionData;
    const questionData: ICheckBox = {
      questionType,
      questionId,
      position,
      question,
      description,
      answers,
    };
    return this.props.handleUpdateQuestion(questionId, questionData);
  }
}

export default CheckboxQuestion;
