import * as React from "react";
import {
  addNewQuestion,
  removeQuestion,
  updateQuestion
} from "../redux/actionCreators";
import { IPriorityQuestion } from "../../types/customTypes";
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
    questionIndex: number;
    addNewQuestion: (questionIndex: number, questionType: any) => any;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  IPriorityQuestion
> {
  state: IPriorityQuestion = {
    questionType: "priorityQuestion",
    question: "Test",
    description: "testing",
    answers: [
      {
        priority: 0,
        answer: "asdsad"
      },
      {
        priority: 0,
        answer: "xcxzc"
      }
    ],
    additionalContents: [
      {
        description: "If your highest priority is c",
        contents: [
          {
            question: "What will you do?",
            answers: ""
          }
        ]
      }
    ],
    completed: true
  };
  handleChangeQuestion = (newQuestion: string) => {
    this.setState(prevState => ({ ...prevState, question: newQuestion }));
  };
  handleRemoveAnswer = (answerIndex: number) => {
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.splice(answerIndex, 1) && prevState.answers
    }));
  };
  handleRemoveAdditionalContent = (contentIndex: number) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents:
        prevState.additionalContents.splice(contentIndex, 1) &&
        prevState.additionalContents
    }));
  };
  handleUpdateAnswer = (
    answerIndex: number,
    newAnswer: { priority: number; answer: string }
  ) => {
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.map((ans: any, index) => {
        index === answerIndex ? (ans.answer = newAnswer.answer) : "";
        return ans;
      })
    }));
  };
  handleAddAnswer = (newAnswer: { priority: number; answer: string }) => {
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.push(newAnswer) && prevState.answers
    }));
  };
  handleAddAdditionalContent = (newAdditionalContent: {
    description: string;
    contents: {
      contentQuestionId: string;
      question: string;
      answers: string;
    }[];
  }) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents:
        prevState.additionalContents.push(newAdditionalContent) &&
        prevState.additionalContents
    }));
  };
  handleUpdateAndditionalContentDesciption = (
    contentIndex: number,
    value: string
  ) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map((elm, index) => {
        index === contentIndex ? (elm.description = value) : "";
        return elm;
      })
    }));
  };
  handleAddQuestionAdditionContent = (
    contentIndex: number,
    newQuestion: { question: string; answers: string }
  ) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map((elm, index) => {
        index === contentIndex ? elm.contents.push(newQuestion) : "";
        return elm;
      })
    }));
  };
  handleUpdateAdditionQuestion = (
    contentIndex: number,
    contentQuestionIndex: number,
    value: string
  ) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map((elm, index) => {
        index === contentIndex
          ? elm.contents.map((elmContent, elmContentIndex) => {
              contentQuestionIndex === elmContentIndex
                ? (elmContent.question = value)
                : "";
              return elmContent;
            })
          : "";
        return elm;
      })
    }));
  };

  handleRemoveAdditionalContentQuestion = (
    contentIndex: number,
    questionIndex: number
  ) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents:
        prevState.additionalContents.map((content, contentIdx) => {
          contentIdx === contentIndex
            ? content.contents.splice(contentIdx, 1)
            : "";
          return content;
        }) && prevState.additionalContents
    }));
  };

  updatePriority = (indexAnswer: number, value: any) => {
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.map((ans, index) => {
        index === indexAnswer ? (ans.priority = value) : "";
        return ans;
      })
    }));
  };
  handleUpdateAnswerContent = (index: number, indexQuestion: number, value: string) => {
      this.setState( prevState => ({
          ...prevState,
          additionalContents: prevState.additionalContents.map((additionalContent: any, indexContent: number) => {
            index === indexContent ? additionalContent.contents.map((contentQuestion: any, indexContentQuestion: number) => {
                indexContentQuestion === indexQuestion ? contentQuestion.answers = value: ""; return contentQuestion;
            }) : ""; return additionalContent;
          })
      }))
  }
  renderClientForm() {
    const {
      props: { questionIndex, removeQuestion },
      state: { question, description, answers, additionalContents },
      updatePriority
    } = this;
    const length: any = [];
    for (let i = 1; i <= answers.length; i++) {
      length.push(i);
    }
    return (
      <div className="input-option-create">
        <div className="question-info">
          <div className="question">{question}</div>
          <div className="description">{description}</div>
        </div>

        <Table>
          <TableBody displayRowCheckbox={false}>
            {answers.map((ans, answerIndex) => {
              return (
                <TableRow key={answerIndex}>
                  <TableRowColumn className="col-sm-8">
                    {ans.answer}
                  </TableRowColumn>
                  <TableRowColumn className="col-sm-4">
                    <SelectField
                      fullWidth
                      value={ans.priority}
                      onChange={(event: object, key: number, payload: any) =>
                        updatePriority(answerIndex, payload)}
                    >
                      {length.map((temp: any) => (
                        <MenuItem value={temp} primaryText={temp} key={temp} />
                      ))}
                    </SelectField>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="additional-cotents-client">
          {additionalContents.map((content, index) => {
            return (
              <div className="content">
                <div className="content-description">{content.description}</div>
                <div className="content-questions">
                  {content.contents.map((question, indexQuestion) => {
                    return (
                      <div>
                        <div className="content-question">
                          {question.question}
                        </div>
                        <div className="content-answer">
                          <TextField
                            name="answerText"
                            hintText="Add an answer here."
                            value={question.answers}
                            fullWidth
                            onChange={(e: any) =>
                              this.handleUpdateAnswerContent(index, indexQuestion, e.target.value)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  renderFormCreate() {
    const {
      props: { questionIndex, removeQuestion },
      state: { question, answers, additionalContents },
      handleChangeQuestion,
      handleUpdateAnswer,
      handleAddAnswer,
      handleRemoveAnswer,
      handleAddAdditionalContent,
      handleUpdateAndditionalContentDesciption,
      handleAddQuestionAdditionContent,
      handleUpdateAdditionQuestion,
      handleRemoveAdditionalContent,
      handleRemoveAdditionalContentQuestion
    } = this;
    return (
      <div className="input-option-create">
        <TextField
          name="questionText"
          hintText="Priority question"
          multiLine
          fullWidth
          rows={2}
          value={question}
          onChange={(e: any) => handleChangeQuestion(e.target.value)}
          floatingLabelText={`Question ${questionIndex + 1}`}
        />
        <div className="clear-fix multiple-answer">
          {answers.map((answer: any, answerIndex: number) => {
            console.log(answer);

            return (
              <div className="radio-answer" key={answerIndex}>
                {answers.length > 1 && (
                  <div>
                    <div
                      className="delete-area"
                      onClick={() => handleRemoveAnswer(answerIndex)}
                    >
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="icon-radio clear-fix">
                  <i className="material-icons">equalizer</i>
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="answerText"
                    hintText="Add an answer here."
                    fullWidth
                    value={answer.answer}
                    onChange={(e: any) =>
                      handleUpdateAnswer(answerIndex, {
                        priority: 0,
                        answer: e.target.value
                      })}
                  />
                </div>
              </div>
            );
          })}
          <div className="radio-answer align-center">
            <FloatingActionButton
              mini
              onClick={e => handleAddAnswer({ priority: 0, answer: "" })}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <RaisedButton
            label="Additional Content"
            primary={true}
            onClick={e =>
              handleAddAdditionalContent({
                description: "",
                contents: [
                  {
                    contentQuestionId: "",
                    question: "",
                    answers: ""
                  }
                ]
              })}
          />
        </div>
        <div className="additional-detail">
          {additionalContents.map((content, contentIndex) => {
            return (
              <div className="additional-container" key={contentIndex}>
                <div>
                  <div
                    className="delete-area"
                    onClick={() => handleRemoveAdditionalContent(contentIndex)}
                  >
                    <i className="fa fa-times" />
                  </div>
                </div>
                <TextField
                  name="answerText"
                  hintText="Add description here."
                  fullWidth
                  value={content.description}
                  onChange={(e: any) =>
                    handleUpdateAndditionalContentDesciption(
                      contentIndex,
                      e.target.value
                    )}
                />
                {content.contents.map((ctn, ctnQuestionIndex) => {
                  return (
                    <div>
                      <div className="additional-question-container">
                        <div
                          className="delete-area"
                          onClick={() =>
                            handleRemoveAdditionalContentQuestion(
                              contentIndex,
                              ctnQuestionIndex
                            )}
                        >
                          <i className="fa fa-times" />
                        </div>
                      </div>
                      <TextField
                        name="answerText"
                        hintText="Add a question here."
                        fullWidth
                        value={ctn.question}
                        onChange={(e: any) =>
                          handleUpdateAdditionQuestion(
                            contentIndex,
                            ctnQuestionIndex,
                            e.target.value
                          )}
                      />
                    </div>
                  );
                })}
                <div className="align-center">
                  <RaisedButton
                    label="Add question"
                    primary={true}
                    onClick={e =>
                      handleAddQuestionAdditionContent(contentIndex, {
                        question: "",
                        answers: ""
                      })}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  render() {
    return (
        <div className="padding-bottom-25">
            {
                this.state.completed === false ? (
                    this.renderFormCreate()
                ) : (
                    this.renderClientForm()
                )
            }
        </div>
    )
  }

  componentDidUpdate() {
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addNewQuestion: (questionIndex: number, questionType: any) =>
    dispatch(addNewQuestion(questionIndex, questionType)),
  removeQuestion: (questionIndex: number) =>
    dispatch(removeQuestion(questionIndex)),
  updateQuestion: (questionIndex: number, questionData: any) =>
    dispatch(updateQuestion(questionIndex, questionData))
});

export default connect(null, mapDispatchToProps)(PriorityQuestion);
