import * as React from "react";
import { connect } from "react-redux";
import { addNewQuestion, removeQuestion, updateQuestion } from "../redux/actionCreators";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { IDropdown } from "../../types/customTypes";

class DropdownQuestion extends React.Component<
    {
        questionNumber: number;
        questionIndex: number;
        addNewQuestion: (questionIndex: number, questionData: any) => any;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IDropdown
> {
    state: IDropdown = {
        questionType: "dropdown",
        question: "",
        answers: [],
    };
    handleChangeQuestion = (newQuestion: string) => {
        this.setState(prevState => ({ ...prevState, question: newQuestion }));
    };
    handleRemoveAnswer = (answerIndex: number) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) }));
    };
    handleUpdateAnswer = (answerIndex: number, newAnswer: { correct: boolean; answer: string }) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));
    };
    handleAddAnswer = (newAnswer: { correct: boolean; answer: string }) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));
    };
    render() {
        const {
            props: { questionNumber, questionIndex, removeQuestion },
            state: { question, answers },
            handleChangeQuestion,
            handleUpdateAnswer,
            handleAddAnswer,
            handleRemoveAnswer,
        } = this;
        return (
            <div>
                <TextField
                    name="questionText"
                    hintText="Multiple choices question"
                    multiLine
                    fullWidth
                    rows={2}
                    value={question}
                    onChange={(e: any) => handleChangeQuestion(e.target.value)}
                    floatingLabelText={`Question ${questionNumber}`}
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
                                    <i className="material-icons">radio_button_checked</i>
                                </div>
                                <div className="input-field input-text-radio input-option-create">
                                    <TextField
                                        name="answerText"
                                        hintText="Add an answer here."
                                        fullWidth
                                        value={answer}
                                        onChange={(e: any) => handleUpdateAnswer(answerIndex, { correct: false, answer: e.target.value })}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="radio-answer align-center">
                        <RaisedButton label="More option" primary onClick={e => handleAddAnswer({correct: false, answer: ""})} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        return this.props.updateQuestion(this.props.questionIndex, this.state);
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    addNewQuestion: (questionIndex: number, questionData: any) => dispatch(addNewQuestion(questionIndex, questionData)),
    removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
    updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(DropdownQuestion);
