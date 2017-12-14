import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { updateQuestion } from "../redux/actionCreators";
import { IMultipleDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import FloatingActionButton from "material-ui/FloatingActionButton";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

const styles: { [name: string]: React.CSSProperties } = {
  textQuestionColumn: {
    width: "40%",
    textAlign: "center",
  },
  optionAnswerFieldCoumn: {
    textAlign: "center",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  removeColumn: {
    width: "10%",
    textAlight: "center",
  },
};

class MultipleDropdownQuestion extends React.Component<
  {
    questionData: any;
    handleUpdateQuestion: (questionId: number, questionData: any) => any;
  },
  {}
> {
  checkBox = false;
  state = {
    question: "",
    description: "",
    headers: [
      { headerId: 0, text: "Q1", tooltip: "Content", answerOptions: [""] },
      {
        headerId: 1,
        text: "Q2",
        tooltip: "Please choose one",
        answerOptions: ["Not Interested", "Interested", "High Interested"],
      },
      {
        headerId: 2,
        text: "Q3",
        tooltip: "Please choose one",
        answerOptions: ["Unimportant", "Important", "Very Important"],
      },
    ],
    answers: [
      {
        answerId: 0,
        contents: [
          { refId: 0, textAnswer: "", chosen: false },
          { refId: 1, textAnswer: "", chosen: false },
          { refId: 2, textAnswer: "", chosen: false },
        ],
      },
      {
        answerId: 1,
        contents: [
          { refId: 0, textAnswer: "", chosen: false },
          { refId: 1, textAnswer: "", chosen: false },
          { refId: 2, textAnswer: "", chosen: false },
        ],
      },
    ],
  };

  handleUpdateQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));
  handleUpdateDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));
  handleUpdateHeader = (headerId: number, headerKey: "text" | "tooltip" | "answerOptions", value: string | string[]) =>
    this.setState((prevState: any) => ({
      ...prevState,
      headers: prevState.headers.map((e: any) => (e.headerId === headerId ? { ...e, [headerKey]: value } : e)),
    }));
  handleUpdateHeaderDropdownOption = (indexDropdown: number, indexOption: number, newOption: string) =>
    this.setState((prevState: any) => ({
      ...prevState,
      headers: prevState.headers.map(
        (header: any) =>
          header.headerId === indexDropdown
            ? {
                ...header,
                answerOptions: header.answerOptions.map((option: any, i: number) => (i === indexOption ? newOption : option)),
              }
            : header,
      ),
    }));
  handleRemoveHeaderDropdownOption = (headerIndex: number, indexOption: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      headers: prevState.headers.map(
        (header: any) =>
          header.headerId === headerIndex ? header.answerOptions.filter((e: any, i: number) => i !== indexOption) : header,
      ),
    }));
  handleAddDropdownOption = (indexDropdown: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      headers: prevState.headers.map(
        (answer: any) => (answer.headerId === indexDropdown ? { ...answer, answerOptions: "" } : answer),
      ),
    }));
  handleAddAnswer = () => {
    const { headers, answers } = this.state;
    const answerId = answers.length;
    const contents: any[] = [];
    const hLen = headers.length;
    for (let i = 0; i < hLen; i += 1) {
      contents.push({ refId: i, textAnswer: "" });
    }
    return this.setState((prevState: any) => ({
      ...prevState,
      answers: [...prevState.answers, { answerId, contents }],
    }));
  };
  handleUpdateAnswer = (answerId: number, refId: number, textAnswer: string) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.map(
        (answer: any) =>
          answer.answerId === answerId
            ? {
                answerId,
                contents: answer.contents.map((content: any) => (content.refId === refId ? { refId, textAnswer } : content)),
              }
            : answer,
      ),
    }));
  handleRemoveAnswer = (answerIndex: number) =>
    this.setState((prevState: any) => ({
      ...prevState,
      answers: prevState.answers.filter((e: any) => e.answerId !== answerIndex),
    }));
  getHeaderAnswerOptions = (refId: number): string[] => this.state.headers.filter(e => e.headerId === refId)[0].answerOptions;
  renderFormCreate() {
    const {
      state: { question, answers, description, headers },
      handleUpdateQuestion,
      handleUpdateDescription,
      handleUpdateAnswer,
      handleAddAnswer,
      handleRemoveAnswer,
      getHeaderAnswerOptions,
      checkBox,
    } = this;
    const headerQ1Options = headers[1].answerOptions;
    const headerQ2Options = headers[2].answerOptions;
    return (
      <div>
        <div style={{ padding: "0 24px" }}>
          <TextField
            name="questionText"
            hintText="Multiple choices question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => handleUpdateQuestion(e.target.value)}
            floatingLabelText="Question"
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => handleUpdateDescription(e.target.value)}
            floatingLabelText="Description"
          />
        </div>
        <div>
          {this.state.answers.map((answer, index) => {
            return (
              <div className="radio-answer" key={index}>
                {answers.length > 1 && (
                  <div>
                    <div className="delete-area" onClick={() => handleRemoveAnswer(index)}>
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="icon-radio clear-fix">
                  <i className="material-icons">radio_button_checked</i>
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="answerText"
                    hintText="Add a question here."
                    fullWidth
                    value={answer.contents[0].textAnswer}
                    onChange={(e: any) => handleUpdateAnswer(answer.answerId, 0, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="radio-answer align-center">
          <FloatingActionButton mini onClick={e => handleAddAnswer()}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <div className="dropdown-multi">
          <div className="title">First dropdown</div>
          <TextField
            name="answerText"
            hintText="Description."
            fullWidth
            value={headers[1].text}
            onChange={(e: any) => this.handleUpdateHeader(1, "text", e.target.value)}
          />
          {headerQ1Options.map((answer: any, answerIndex: number) => {
            return (
              <div className="radio-answer" key={answerIndex}>
                {headerQ1Options.length > 1 && (
                  <div className="pos-relative">
                    <div className="delete-area" onClick={() => this.handleRemoveHeaderDropdownOption(1, answerIndex)}>
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="icon-radio clear-fix">
                  <i className="material-icons">arrow_drop_down_circle</i>
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="answerText"
                    hintText="Add an answer here."
                    fullWidth
                    value={answer}
                    onChange={(e: any) => this.handleUpdateHeaderDropdownOption(1, answerIndex, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
          <div className="radio-answer align-center">
            <FloatingActionButton mini onClick={e => this.handleAddDropdownOption(1)}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <div className="dropdown-multi">
          <div className="title">Second dropdown</div>
          <TextField
            name="answerText"
            hintText="Description."
            fullWidth
            value={headers[2].text}
            onChange={(e: any) => this.handleUpdateHeader(2, "text", e.target.value)}
          />
          {headerQ2Options.map((answer: any, answerIndex: number) => {
            return (
              <div className="radio-answer" key={answerIndex}>
                {headerQ2Options.length > 1 && (
                  <div className="pos-relative">
                    <div className="delete-area" onClick={() => this.handleRemoveHeaderDropdownOption(2, answerIndex)}>
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="icon-radio clear-fix">
                  <i className="material-icons">arrow_drop_down_circle</i>
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="answerText"
                    hintText="Add an answer here."
                    fullWidth
                    value={answer}
                    onChange={(e: any) => this.handleUpdateHeaderDropdownOption(2, answerIndex, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
          <div className="radio-answer align-center">
            <FloatingActionButton mini onClick={e => this.handleAddDropdownOption(2)}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderFormCreate()}</div>;
  }
  componentDidUpdate() {
    const { question, answers, description, headers } = this.state;
    const { questionType, questionId, position, completed } = this.props.questionData;
    const questionData: IMultipleDropdown = {
      questionType,
      questionId,
      position,
      question,
      description,
      headers,
      answers,
    };
    return this.props.handleUpdateQuestion(questionId, questionData);
  }
}

export default MultipleDropdownQuestion;
