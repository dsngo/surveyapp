import * as React from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IMultipleDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
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
  state: IMultipleDropdown = {
    questionType: "multipleDropdown",
    question: "",
    description: "",
    headers: [
      { headerId: 1, text: "", tooltip: "", answerOptions: [""] },
      { headerId: 2, text: "", tooltip: "", answerOptions: [""] },
    ],
    answers: [
      { answerId: 1, contents: [{ refId: 1, textAnswer: "" }, { refId: 2, textAnswer: "" }] },
      { answerId: 2, contents: [{ refId: 1, textAnswer: "" }, { refId: 2, textAnswer: "" }] },
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

  handleUpdateAnswer = (answerId: number, refId: number, mainText: string) =>
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.filter(e => e.answerId === answerId)[0].contents.map(e => (e.refId === refId ? mainText : e)),
    }));

  handleAddAnswer = () => {
    const { headers, answers } = this.state;
    const answerId = answers.length + 1;
    const contents: IMultipleDropdown["answer"][0]["contents"] = [];
    const hLen = headers.length;
    for (let i = 1; i <= hLen; i += 1) {
      contents.push({ refId: i, textAnswer: "" });
    }
    return this.setState(prevState => ({
      ...prevState,
      answers: [...prevState.answers, { answerId, contents }],
    }));
  };


  getHeaderAnswerOptions(headerId: number) {
    return this.state.headers.filter(e => e.headerId === headerId).map(e => e.answerOptions);
  }

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
    } = this;
    return (
      <div>
        <div className="delete-area" onClick={e => removeQuestion(questionIndex)}>
          <i className="fa fa-times" />
        </div>
        <TextField
          name="questionText"
          hintText="Multiple choices question"
          multiLine
          fullWidth
          value={question}
          onChange={(e: any) => handleChangeQuestion(e.target.value)}
          floatingLabelText={`Question ${questionNumber}`}
        />
        <TextField
          name="questionDescription"
          hintText="Extra Description"
          multiLine
          fullWidth
          value={description}
          onChange={(e: any) => handleChangeDescription(e.target.value)}
          floatingLabelText={"Question description"}
        />
        <Table>
          <TableHeader>
            <TableRow>{headers.map(e => <TableHeaderColumn tooltip={e.tooltip}>{e.text}</TableHeaderColumn>)}</TableRow>
          </TableHeader>
          <TableBody>
            {answers.map(answer => (
              <TableRow>
                {answer.contents.map(
                  content =>
                    content.refId === 1 ? (
                      <TableRowColumn>
                        <TextField
                          value={content.textAnswer}
                          onChange={(e: any) => handleUpdateAnswer(answer.answerId, content.refId, e.target.value)}
                          hintText="Additional Question"
                        />
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn>
                        <SelectField
                          floatingLabelText="Please select one"
                          value={content.textAnswer}
                          onChange={(e, i, p) => handleUpdateAnswer(answer.answerId, content.refId, p)}
                        >
                          {getHeaderAnswerOptions(content.refId).map(e => <MenuItem value={e} primaryText="" />)}
                        </SelectField>
                      </TableRowColumn>
                    ),
                )}
              </TableRow>
            ))}
          </TableBody>
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
                            <ContentAdd />
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
