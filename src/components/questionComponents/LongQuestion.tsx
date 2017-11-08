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

  handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

  handleChangeDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));

  handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

  getAnswerString(answers: string[]) {
    return answers.join("\n");
  }

  renderFormCreate = (question: string, description: string, questionIndex: number, answers: any) => (
      <div>
        <div className="input-option-create padding-bottom-25">
          <TextField
            name="questionText"
            hintText="Long question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => this.handleChangeQuestion(e.target.value)}
            floatingLabelText={`Question ${questionIndex + 1}`}
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => this.handleChangeDescription(e.target.value)}
            floatingLabelText={"Question description"}
          />
        </div>
      </div>
    )
    
    render() {
      const {
          props: { 
              questionIndex, 
              removeQuestion, 
              questionData: { 
                  question, 
                  answers, 
                  description
              } 
          }
      } = this;
      return (
      <div className="question-component">
          {this.renderFormCreate(question, description, questionIndex, answers)}
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
