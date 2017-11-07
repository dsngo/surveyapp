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
    questionIndex: number;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  IMultipleDropdown
> {
  checkBox = false;
  state: IMultipleDropdown = {
    questionType: "multipleDropdown",
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

  handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

  handleChangeDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));

  handleRemoveDropdownOption = (indexDropdown: number, indexOption: number) => 
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map((header) => {
        header.headerId === indexDropdown ? header.answerOptions.splice(indexOption, 1) : "";
        return header;
      })
    }))
  handleChangeHeader = (headerId: number, text: string, tooltip: string, answerOptions: string[]) =>
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map(e => (e.headerId === headerId ? { headerId, text, tooltip, answerOptions } : e)),
    }));

  handleUpdateDescriptionDropdown = (indexDropdown: number, text: string) => {
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map((header, indexHeader) => {
        indexHeader === indexDropdown ? (header.text = text) : "";
        return header;
      }),
    }));
  };

  handleAddDropdownOption = (indexDropdown: number) => {
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map(answer => {
        answer.headerId === indexDropdown ? answer.answerOptions.push("") : "";
        return answer;
      }),
    }));
  };

  handleUpdateDropdownOption = (indexDropdown: number, indexOption: number, newOption: string) =>
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map(
        header =>
          header.headerId === indexDropdown
            ? {
                ...header,
                answerOptions: header.answerOptions.map((option, i) => (i === indexOption ? newOption : option)),
              }
            : header,
      ),
    }));
  handleRemoveAnswer = (answerIndex: number) =>
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.filter(e => e.answerId !== answerIndex),
    }));

  handleUpdateAnswer = (answerId: number, refId: number, textAnswer: string) =>
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.map(
        answer =>
          answer.answerId === answerId
            ? {
                answerId,
                contents: answer.contents.map(content => (content.refId === refId ? { refId, textAnswer } : content)),
              }
            : answer,
      ),
    }));

  handleAddAnswer = () => {
    const { headers, answers } = this.state;
    const answerId = answers.length + 1;
    const contents: any[] = [];
    const hLen = headers.length;
    for (let i = 0; i < hLen; i += 1) {
      contents.push({ refId: i, textAnswer: "" });
    }
    return this.setState(prevState => ({
      ...prevState,
      answers: [...prevState.answers, { answerId, contents }],
    }));
  };

  getHeaderAnswerOptions = (refId: number): string[] => this.state.headers.filter(e => e.headerId === refId)[0].answerOptions;

  renderFormCreate() {
    const {
      props: { questionIndex },
      state: { question, answers, description, headers },
      handleChangeQuestion,
      handleChangeDescription,
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
            onChange={(e: any) => handleChangeQuestion(e.target.value)}
            floatingLabelText={`Question ${questionIndex + 1}`}
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => handleChangeDescription(e.target.value)}
            floatingLabelText={"Question Description"}
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
            onChange={(e: any) => this.handleUpdateDescriptionDropdown(1, e.target.value)}
          />
          {headerQ1Options.map((answer: any, answerIndex: number) => {
            return (
              <div className="radio-answer" key={answerIndex}>
                {headerQ1Options.length > 1 && (
                  <div className="pos-relative">
                    <div className="delete-area" onClick={() => this.handleRemoveDropdownOption(1, answerIndex)}>
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
                    onChange={(e: any) => this.handleUpdateDropdownOption(1, answerIndex, e.target.value)}
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
            onChange={(e: any) => this.handleUpdateDescriptionDropdown(2, e.target.value)}
          />
          {headerQ2Options.map((answer: any, answerIndex: number) => {
            return (
              <div className="radio-answer" key={answerIndex}>
                {headerQ2Options.length > 1 && (
                  <div className="pos-relative">
                    <div className="delete-area" onClick={() => this.handleRemoveDropdownOption(2, answerIndex)}>
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
                    onChange={(e: any) => this.handleUpdateDropdownOption(2, answerIndex, e.target.value)}
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

  renderClientForm() {
    const {
      props: { questionIndex },
      state: { question, answers, description, headers },
      handleChangeQuestion,
      handleChangeDescription,
      handleUpdateAnswer,
      handleAddAnswer,
      handleRemoveAnswer,
      getHeaderAnswerOptions,
      checkBox,
    } = this;
    return (
      <Paper zDepth={1} className="question-component">
        <Table>
          <TableHeader displaySelectAll={checkBox} adjustForCheckbox={checkBox}>
            <TableRow>
              {headers.map((e, i) => (
                <TableHeaderColumn
                  key={`header-${i}`}
                  style={e.headerId === 0 ? styles.textQuestionColumn : styles.optionAnswerFieldCoumn}
                  tooltip={e.tooltip}
                >
                  {e.text}
                </TableHeaderColumn>
              ))}
              <TableHeaderColumn tooltip="Remove" style={styles.removeColumn}>
                Remove
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={checkBox}>
            {answers.map((answer, i) => (
              <TableRow key={`answer-${i}`}>
                {answer.contents.map((content, i) => (
                  <TableRowColumn
                    key={`content-${i}`}
                    style={content.refId === 0 ? styles.textQuestionColumn : styles.optionAnswerFieldCoumn}
                  >
                    {content.refId === 0 ? (
                      <TextField
                        value={content.textAnswer}
                        onChange={(e: any) => handleUpdateAnswer(answer.answerId, content.refId, e.target.value)}
                        multiLine
                        fullWidth
                        hintText="Additional Question"
                      />
                    ) : (
                      <DropDownMenu
                        autoWidth={false}
                        style={{ width: "100%" }}
                        value={content.textAnswer}
                        onChange={(e, i, p) => handleUpdateAnswer(answer.answerId, content.refId, p)}
                      >
                        {getHeaderAnswerOptions(content.refId).map((e, i) => (
                          <MenuItem key={`option-${i}`} value={e} primaryText={e} />
                        ))}
                      </DropDownMenu>
                    )}
                  </TableRowColumn>
                ))}
                <TableRowColumn style={styles.removeColumn}>
                  <FloatingActionButton mini secondary onClick={e => handleRemoveAnswer(answer.answerId)}>
                    <ContentRemove />
                  </FloatingActionButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={checkBox}>
            <TableRow>
              <TableRowColumn
                style={{
                  textAlign: "center",
                  paddingBottom: "1em",
                  height: "5em",
                }}
              >
                <FloatingActionButton mini onClick={e => handleAddAnswer()}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
  render() {
    return <div>{this.renderFormCreate()}</div>;
  }

  componentDidUpdate() {
    console.log(this.state);

    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(MultipleDropdownQuestion);
