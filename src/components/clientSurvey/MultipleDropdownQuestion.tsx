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
      { headerId: 1, text: "Q2", tooltip: "Please choose one", answerOptions: ["Not Interested", "Interested", "High Interested"] },
      { headerId: 2, text: "Q3", tooltip: "Please choose one", answerOptions: ["Unimportant", "Important", "Very Important"] },
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
      <Paper zDepth={1} style={{ width: "90%", margin: "10px auto" }} className="question-component">
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
              <TableRowColumn style={{ textAlign: "center", paddingBottom: "1em", height: "5em" }}>
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

  componentDidUpdate() {
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(MultipleDropdownQuestion);
