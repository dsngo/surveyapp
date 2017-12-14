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
    questionIndex: number;
    questionData: any;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  IPriority
> {
  state: IPriority = {
    questionType: "priorityQuestion",
    question: "",
    description: "",
    answers: [
      {
        priority: 0,
        text: "",
      },
    ],
    additionalContents: [],
    completed: false,
  };

  updatePriority = (indexAnswer: number, value: any) => {
    this.setState(prevState => ({
      ...prevState,
      answers: prevState.answers.map((ans, index) => {
        index === indexAnswer ? (ans.priority = value) : "";
        return ans;
      }),
    }));
  };
  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      question: this.props.questionData.question,
      description: this.props.questionData.description,
      answers: this.props.questionData.answers,
      additionalContents: this.props.questionData.additionalContents,
    }));
  }

  handleUpdateAnswerContent = (index: number, indexQuestion: number, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      additionalContents: prevState.additionalContents.map((additionalContent: any, indexContent: number) => {
        index === indexContent
          ? additionalContent.contents.map((contentQuestion: any, indexContentQuestion: number) => {
              indexContentQuestion === indexQuestion ? (contentQuestion.answers = value) : "";
              return contentQuestion;
            })
          : "";
        return additionalContent;
      }),
    }));
  };
  renderClientForm() {
    const { props: { questionIndex, removeQuestion, questionData }, updatePriority } = this;
    const { question, description, answers, additionalContents } = questionData;
    const length: any = [];
    for (let i = 1; i <= answers.length; i += 1) {
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
            {answers.map((ans: any, answerIndex: any) => {
              return (
                <TableRow key={answerIndex}>
                  <TableRowColumn className="col-sm-8">{ans.answer}</TableRowColumn>
                  <TableRowColumn className="col-sm-4">
                    <SelectField
                      fullWidth
                      value={ans.priority}
                      onChange={(event: object, key: number, payload: any) => updatePriority(answerIndex, payload)}
                    >
                      {length.map((temp: any) => <MenuItem value={temp} primaryText={temp} key={temp} />)}
                    </SelectField>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="additional-cotents-client">
          {additionalContents.map((content: any, index: any) => {
            return (
              <div className="content">
                <div className="content-description">{content.description}</div>
                <div className="content-questions">
                  {content.contents.map((question: any, indexQuestion: any) => {
                    return (
                      <div>
                        <div className="content-question">{question.question}</div>
                        <div className="content-answer">
                          <TextField
                            name="answerText"
                            hintText="Add an answer here."
                            value={question.answers}
                            fullWidth
                            onChange={(e: any) => this.handleUpdateAnswerContent(index, indexQuestion, e.target.value)}
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

  render() {
    return <div className="padding-bottom-25 question-component">{this.renderClientForm()}</div>;
  }

  componentDidUpdate() {
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(PriorityQuestion);
