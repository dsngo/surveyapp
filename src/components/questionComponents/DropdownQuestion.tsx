import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

class DropdownQuestion extends React.Component<
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
        answer: "",
        checked: false,
      },
    ],
  };
  // Methods
  handleUpdateQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));
  handleUpdateDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));
  handleUpdateAnswer = (answerIndex: number, answerKey: string, updatedValue: any) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (ansObj: any, i: number) => (i === answerIndex ? { ...ansObj, [answerKey]: updatedValue } : ansObj),
      ),
    }));
  handleAddAnswer = (newAnswer = { checked: false, correct: false, answer: "" }) =>
    this.setState((prevState: any) => ({ ...prevState, answers: [...prevState.answers, newAnswer] }));
  handleRemoveAnswer = (answerIndex: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.filter((e: any, i: number) => i !== answerIndex),
    }));
  toggleAnswerChecker = (indexAnswer: number, answerKey: string) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (answer: any, index: number) => (index === indexAnswer ? { ...answer, [answerKey]: answer[answerKey] } : answer),
      ),
    }));
  // Render Methods
  renderFormCreate = (question: string, description: string, answers: any) => (
    <div>
      <div className="padding-25-except-top input-option-create">
        <TextField
          name="questionText"
          hintText="Multiple choices question"
          multiLine
          fullWidth
          value={question}
          onChange={(e: any) => this.handleUpdateQuestion(e.target.value)}
          floatingLabelText="Question"
        />
        <TextField
          name="questionDescription"
          hintText="Extra Description"
          multiLine
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
                    label={""}
                  />
                </div>
                <div className="icon-radio clear-fix">
                  <i className="material-icons">arrow_drop_down_circle</i>
                </div>
                <div className="input-field input-text-radio">
                  <TextField
                    name="answerText"
                    hintText="Add an answer here."
                    fullWidth
                    value={answer.answer}
                    onChange={(e: any) => this.handleUpdateAnswer(answerIndex, "text", e.target.value)}
                  />
                </div>
              </div>
            );
          })}
          <div className="radio-answer align-center">
            <FloatingActionButton mini onClick={e => this.handleAddAnswer({ checked: false, correct: false, answer: "" })}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const { props: { questionData: { question, answers, description } } } = this;
    return <div className="question-component">{this.renderFormCreate(question, description, answers)}</div>;
  }

  // Lifecycle Methods
  componentDidUpdate() {
    const { question, answers, description } = this.state;
    const { questionType, questionId, position, completed } = this.props.questionData;
    const questionData: IDropdown = {
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

export default DropdownQuestion;
