import * as React from "react";
import { addQuestion, removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IPriority } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";

class PriorityQuestion extends React.Component<
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
        priority: 0,
        text: "",
      },
    ],
    additionalContents: [],
  };
  // Methods
  handleUpdateQuestion = (newQuestion: string) => this.setState((prevState: any) => ({ ...prevState, question: newQuestion }));
  // =============================
  handleUpdateDescription = (newDescription: string) =>
    this.setState((prevState: any) => ({ ...prevState, description: newDescription }));
  // =============================
  handleUpdateAnswer = (answerIndex: number, answerKey: string, updatedValue: any) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (ansObj: any, i: number) => (i === answerIndex ? { ...ansObj, [answerKey]: updatedValue } : ansObj),
      ),
    }));
  handleAddAnswer = (newAnswer: { priority: number; answer: string }) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: [...prevState.answers, newAnswer],
    }));
  handleRemoveAnswer = (answerIndex: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.filter((e: any, i: number) => i !== answerIndex),
    }));
  // =============================
  handleUpdateAdditionalContent = (contentIndex: number, contentKey: string, value: any) =>
    this.setState((prevState: any) => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map(
        (e: any, i: number) => (i === contentIndex ? { ...e, [contentKey]: value } : e),
      ),
    }));
  handleAddAdditionalContent = (newContent = { description: "", entries: [{ question: "", answer: "" }] }) =>
    this.setState((prevState: any) => ({ ...prevState, additionalContents: [...prevState.additionalContents, newContent] }));
  handleRemoveAdditionalContent = (contentIndex: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      additionalContents: prevState.additionalContents.filter((e: any, i: number) => i !== contentIndex),
    }));
  // =============================
  handleUpdateEntry = (contentId: number, entryId: number, entryKey: string, entryValue: string) =>
    this.setState((prevState: any) => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map(
        (c: any, i: number) =>
          i === contentId
            ? c.map((entry: any, eId: number) => (eId === entryId ? { ...entry, [entryKey]: entryValue } : entry))
            : c,
      ),
    }));
  handleAddEntry = (contentId: number, newEntry = { question: "", answers: "" }) =>
    this.setState((prevState: any) => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map(
        (c: any, i: number) => (i === contentId ? { ...c, entries: [...c.entries, newEntry] } : c),
      ),
    }));
  handleRemoveEntry = (contentId: number, entryId: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map(
        (c: any, i: number) => (i === contentId ? { ...c, entries: c.entries.filter((e: any, i: number) => i !== entryId) } : c),
      ),
    }));
  // =============================  

  renderFormCreate = (question: string, description: string, answers: any, additionalContents: any) => (
    <div className="input-option-create">
      <TextField
        name="questionText"
        hintText="Priority question"
        multiLine
        fullWidth
        rows={2}
        value={question}
        onChange={(e: any) => this.handleUpdateQuestion(e.target.value)}
        floatingLabelText="Question"
      />
      <div className="clear-fix multiple-answer">
        {answers.map((answer: any, answerIndex: number) => {
          console.log(answer);

          return (
            <div className="radio-answer" key={answerIndex}>
              <div className="icon-radio clear-fix">
                <i className="material-icons">equalizer</i>
              </div>
              <div className="input-field input-text-radio input-option-create">
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
          <FloatingActionButton mini onClick={e => this.handleAddAnswer({ priority: 0, answer: "" })}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <RaisedButton label="Additional Content" primary={true} onClick={e => this.handleAddAdditionalContent()} />
      </div>
      <div className="additional-detail">
        {additionalContents.map((content: any, contentIndex: any) => {
          return (
            <div className="additional-container" key={contentIndex}>
              <div>
                <div className="delete-area" onClick={() => this.handleRemoveAdditionalContent(contentIndex)}>
                  <i className="fa fa-times" />
                </div>
              </div>
              <TextField
                name="answerText"
                hintText="Add description here."
                fullWidth
                value={content.description}
                onChange={(e: any) => this.handleUpdateAdditionalContent(contentIndex, "description", e.target.value)}
              />
              {content.contents.map((ctn: any, ctnQuestionIndex: any) => {
                return (
                  <div>
                    <div className="additional-question-container">
                      <div
                        className="delete-area"
                        onClick={() => this.handleRemoveEntry(contentIndex, ctnQuestionIndex)}
                      >
                        <i className="fa fa-times" />
                      </div>
                    </div>
                    <TextField
                      name="answerText"
                      hintText="Add a question here."
                      fullWidth
                      value={ctn.question}
                      onChange={(e: any) => this.handleUpdateEntry(contentIndex, ctnQuestionIndex, "question", e.target.value)}
                    />
                  </div>
                );
              })}
              <div className="align-center">
                <RaisedButton
                  label="Add question"
                  primary={true}
                  onClick={e =>
                    this.handleAddEntry(contentIndex)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  render() {
    const {
      props: { questionData: { question, answers, description, additionalContents } },
    } = this;
    return (
      <div className="question-component">
        {this.renderFormCreate(question, description, answers, additionalContents)}
      </div>
    );
  }

  componentDidUpdate() {
    const { question, answers, description, additionalContents } = this.state;
    const { questionType, questionId, position, completed } = this.props.questionData;
    const questionData: IPriority = {
      position,
      questionType,
      questionId,
      question,
      answers,
      description,
      additionalContents,
    };
    return this.props.handleUpdateQuestion(questionId, questionData);
  }
}

export default PriorityQuestion;
