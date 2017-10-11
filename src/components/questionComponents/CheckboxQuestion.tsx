import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { ICheckBox } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";

class CheckboxQuestion extends React.Component<
  {
    questionIndex: number;
    removeQuestion: (questionIndex: number) => any;
    updateQuestion: (questionIndex: number, questionData: any) => any;
  },
  ICheckBox
> {
    state: ICheckBox = {
        questionType: "checkbox",
        question: "How are u?",
        description: "OK...",
        answers: [{
            correct: false,
            text: "Kai"
        }],
        completed: true
    };
    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

  handleChangeDescription = (newDescription: string) =>
    this.setState(prevState => ({ ...prevState, description: newDescription }));

  handleRemoveAnswer = (answerIndex: number) => {
    this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) && prevState.answers }));
  };

  handleUpdateAnswer = (answerIndex: number, newAnswer: string) =>
    this.setState(prevState => ({
        ...prevState, answers: prevState.answers.map(
            (ans: any, index) => { index === answerIndex ? ans.text = newAnswer : ""; return ans;}
        )
    }))
    updateAnswer = (indexAnswer: number) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.map((answer, index) => {
            index === indexAnswer ? answer.correct = !answer.correct : ""; return answer;
        })}));
    }
    handleAddAnswer = () =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push({ correct: false, text: ""}) && prevState.answers}));

    renderClientForm = () => {
        const {
            props: { questionIndex, removeQuestion },
            state: { question, answers, description },
        } = this;
        return (
            <div>
                <Paper zDepth={3}>
                    <div className="question-field" >
                        <div className="question-info">
                            <div className="question">{question}</div>
                            <div className="description">{description}</div>
                        </div>
                        <div className="answer">
                            {
                                answers.map((answer: any, key: any) => {
                                    const id = "question_" + "_" + key;
                                    return (
                                        <div>
                                            <Checkbox
                                                onCheck={e => {
                                                    this.updateAnswer(key);
                                                }}
                                                label={answer.text}
                                                key={id}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
    renderCreateForm() {
        const {
            props: { questionIndex, removeQuestion },
            state: { question, answers, description },
            handleChangeQuestion,
            handleChangeDescription,
            handleUpdateAnswer,
            handleAddAnswer,
            handleRemoveAnswer,
        } = this;
        return (
            <div>
                <div className="delete-area" onClick={e => removeQuestion(questionIndex)}>
                    <i className="fa fa-times" />
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="answerText"
                    hintText="Add an answer here."
                    fullWidth
                    value={description}
                    onChange={(e: any) => handleChangeDescription(e.target.value)}
                    floatingLabelText={"Question description"}
                />

                <div className="clear-fix multiple-answer">
                    {answers.map((answer: any, answerIndex: number) => {
                        return (
                            <div className="radio-answer" key={answerIndex}>
                                {answers.length > 1 && (
                                    <div>
                                        <div className="delete-area" onClick={() => handleRemoveAnswer(answerIndex)}>
                                            <i className="fa fa-times" />
                                        </div>
                                    </div>
                                )}
                                <div className="icon-radio clear-fix">
                                    <i className="material-icons">check_circle</i>
                                </div>
                                <div className="input-field input-text-radio input-option-create">
                                    <TextField
                                        name="answerText"
                                        hintText="Add an answer here."
                                        fullWidth
                                        value={answer.text}
                                        onChange={(e: any) =>
                                            handleUpdateAnswer(answerIndex, e.target.value)}
                                            
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="radio-answer align-center">
                        <RaisedButton
                            label="More option"
                            primary={true}
                            onClick={e => handleAddAnswer()}
                        />
                    </div>
                </div>
            </div>
            </div>
        );
    }
    render() {
        if (this.state.completed !== true) return (
            <div>
                {
                    this.renderCreateForm()
                }
            </div>
        )
        return (
            <div>
                {
                    this.renderClientForm()
                }
            </div>
        )
    }

  componentDidUpdate() {
    return this.props.updateQuestion(this.props.questionIndex, this.state);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
  updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(CheckboxQuestion);
