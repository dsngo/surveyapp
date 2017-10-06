import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IMultipleDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentClear from "material-ui/svg-icons/content/clear";
import ContentRemove from "material-ui/svg-icons/content/remove";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import TextField from "material-ui/TextField";

class MultipleDropdownQuestion extends React.Component<
  {
    questionNumber: number;
    questionIndex: number;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  IMultipleDropdown
> {
  checkBox = false;
  mainAnswerFieldColumn = { width: "50%" };
  removeButtonColumnStyle = { width: "10%" };
  state: IMultipleDropdown = {
    questionType: "multipleDropdown",
    question: "",
    description: "",
    headers: [
      { headerId: 0, text: "", tooltip: "test1", answerOptions: [""] },
      { headerId: 1, text: "", tooltip: "test2", answerOptions: ["option1", "option2", "option3"] },
      { headerId: 2, text: "", tooltip: "test3", answerOptions: ["option4", "option5", "option6"] },
    ],
    answers: [
      { answerId: 0, contents: [{ refId: 0, textAnswer: "" }, { refId: 1, textAnswer: "" }, { refId: 2, textAnswer: "" }] },
      { answerId: 1, contents: [{ refId: 0, textAnswer: "" }, { refId: 1, textAnswer: "" }, { refId: 2, textAnswer: "" }] },
    ],
  };

  handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

  handleChangeDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));

  handleChangeHeader = (headerId: number, text: string, tooltip: string, answerOptions: string[]) =>
    this.setState(prevState => ({
      ...prevState,
      headers: prevState.headers.map(e => (e.headerId === headerId ? { headerId, text, tooltip, answerOptions } : e)),
    }));

  handleRemoveAnswer = (answerIndex: number) =>
    this.setState(prevState => ({ ...prevState, answers: prevState.answers.filter(e => e.answerId !== answerIndex) }));

  handleUpdateAnswer = (answerId: number, refId: number, textAnswer: string) =>
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.map(
        answer =>
          answer.answerId === answerId
            ? { answerId, contents: answer.contents.map(content => (content.refId === refId ? { refId, textAnswer } : content)) }
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

  render() {
    const {
      props: { questionNumber, questionIndex, removeQuestion },
      state: { question, answers, description, headers },
      handleChangeQuestion,
      handleChangeDescription,
      handleUpdateAnswer,
      handleAddAnswer,
      handleRemoveAnswer,
      getHeaderAnswerOptions,
      checkBox,
      removeButtonColumnStyle,
      mainAnswerFieldColumn,
    } = this;
    // console.log(this); // tslint:disable-line
    return (
      <div>
        <IconButton tooltip="Remove question box" tooltipPosition="top-right" onClick={e => removeQuestion(questionIndex)}>
          <ContentClear />
        </IconButton>
        <TextField
          name="questionText"
          hintText="Multiple choices question"
          multiLine
          fullWidth
          value={question}
          onChange={(e: any) => handleChangeQuestion(e.target.value)}
          floatingLabelText={`Question ${questionNumber || "Text"}`}
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
        <Table>
          <TableHeader displaySelectAll={checkBox} adjustForCheckbox={checkBox}>
            <TableRow>
              {headers.map((e, i) => (
                <TableHeaderColumn style={e.headerId === 0 ? mainAnswerFieldColumn : {}} key={`header-${i}`} tooltip={e.tooltip}>
                  {e.text}
                </TableHeaderColumn>
              ))}
              <TableHeaderColumn style={removeButtonColumnStyle} tooltip="Remove" />>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={checkBox}>
            {answers.map((answer, i) => (
              <TableRow key={`answer-${i}`}>
                {answer.contents.map(
                  (content, i) =>
                    content.refId === 0 ? (
                      <TableRowColumn key={`content-${i}`} style={mainAnswerFieldColumn}>
                        <TextField
                          value={content.textAnswer}
                          onChange={(e: any) => handleUpdateAnswer(answer.answerId, content.refId, e.target.value)}
                          multiLine
                          fullWidth
                          hintText="Additional Question"
                        />
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn key={`content-${i}`}>
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
                      </TableRowColumn>
                    ),
                )}
                <TableRowColumn style={removeButtonColumnStyle}>
                  <FloatingActionButton mini secondary onClick={e => handleRemoveAnswer(answer.answerId)}>
                    <ContentRemove />
                  </FloatingActionButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={checkBox}>
            <TableRow>
              <TableRowColumn style={{ textAlign: "right", padding: "auto" }}>
                <FloatingActionButton mini onClick={e => handleAddAnswer()}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        {/* <div className="clear-fix multiple-answer">
                    {answers.map((answer: any, answerIndex: number) => (
                        <div className="radio-answer" key={answerIndex}>
                            {answers.length > 1 && (
                                <div>
                                    <div className="delete-area" onClick={() => handleRemoveAnswer(answerIndex)}>
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
                                    hintText="Add an answer here."
                                    fullWidth
                                    value={answer}
                                    onChange={(e: any) =>
                                        handleUpdateAnswer(answerIndex, { correct, contents, answerId: answerIndex })}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="radio-answer align-center">
                        <FloatingActionButton onClick={e => handleAddAnswer()}>
                          Clear />
                        </FloatingActionButton>
                    </div>
                </div> */}
      </div>
    );
  }

  componentDidUpdate() {
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(MultipleDropdownQuestion);
