import * as React from "react";
import { ILongQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class LongQuestion extends React.Component<
  {
    questionData: any;
    handleUpdateQuestion: (questionId: number, questionData: any) => any;
  },
  {}
> {
  state = {
    question: "",
    description: "",
    answers: [""],
  };

  handleUpdateState = (stateKey: string, value: any) => this.setState(prevState => ({ ...prevState, [stateKey]: value }));
  handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

  renderFormCreate = () => {
    const { state: { question, answers, description } } = this;
    return (
    <div>
      <div className="input-option-create padding-bottom-25">
        <TextField
          name="questionText"
          hintText="Please type in question"
          multiLine
          fullWidth
          value={question}
          onChange={(e: any) => this.handleUpdateState("question",e.target.value)}
          floatingLabelText="Question"
        />
        <TextField
          name="questionDescription"
          hintText="Please type in description"
          multiLine
          fullWidth
          value={description}
          onChange={(e: any) => this.handleUpdateState("description",e.target.value)}
          floatingLabelText="Description"
        />
      </div>
    </div>
  )};

  render() {
    return <div className="question-component">{this.renderFormCreate()}</div>;
  }

  componentDidUpdate() {
    const { question, answers, description } = this.state;
    const { questionType, questionId, position, completed } = this.props.questionData;
    const questionData: ILongQuestion = {
      position,
      questionType,
      questionId,
      question,
      answers,
      description,
    };
    return this.props.handleUpdateQuestion(questionId, questionData);
  }
}

export default LongQuestion;
