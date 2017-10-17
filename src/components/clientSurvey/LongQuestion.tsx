import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { ILongQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class LongQuestion extends React.Component<
  {
    questionData: any;
    questionIndex: number;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  ILongQuestion
  > {
  state: ILongQuestion = {
    questionType: "longQuestion",
    question: "",
    description: "",
    answers: [""],
    completed: false
  };

  handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

  getAnswerString(answers: string[]) {
    return answers.join("\n");
  }

  renderClientForm() {
    return (
      <div>
        <div className="question-info">
          <div className="question">{this.state.question}</div>
          <div className="description">{this.state.description}</div>
        </div>
        <div className="padding-25-except-top">
          <TextField
            name="answerText"
            hintText="Put your answer here"
            multiLine
            fullWidth
            rows={4}
            value={this.getAnswerString(this.state.answers)}
            onChange={(e: any) => this.handleUpdateAnswer(e.target.value)}
            floatingLabelText="Answer"
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="question-component">
        {
          this.renderClientForm()
        }
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

export default connect(null, mapDispatchToProps)(LongQuestion);
