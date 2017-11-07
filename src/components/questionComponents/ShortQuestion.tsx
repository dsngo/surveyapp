import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class ShortQuestion extends React.Component<
  {
    questionData: any;
    questionIndex: number;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  IShortQuestion
> {
  state: IShortQuestion = {
    questionType: "shortQuestion",
    question: "",
    description: "",
    answers: [""],
    completed: false,
  };

  constructor(props: any) {
    super(props);
  }
  handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

  handleChangeDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));

  handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

  getAnswerString(answers: string[]) {
    return answers.join("\n");
  }

  renderFormCreate = (questionIndex: number, questionData: any) => {
    const { question, answers, description } = questionData;
    return (
      <div className="input-option-create">
        <div className="">
          <TextField
            name="questionText"
            hintText="Short question"
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
    );
  };
  render() {
    const {
      props: { removeQuestion, questionIndex, questionData },
      state: { completed },
      handleChangeQuestion,
      handleChangeDescription,
      handleUpdateAnswer,
      getAnswerString,
      renderFormCreate,
    } = this;
    return <div className="question-component">{renderFormCreate(questionIndex, questionData)}</div>;
  }
  componentDidUpdate() {
    // console.log(this.state);
    // console.log(this.props.questionIndex);
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(ShortQuestion);
