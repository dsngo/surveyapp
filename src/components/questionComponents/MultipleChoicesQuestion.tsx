import * as React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { IMultipleChoices } from "../../types/customTypes";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";

class MultipleChoicesQuestion extends React.Component<
    {
        questionNumber: number;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IMultipleChoices
> {
    state: IMultipleChoices = {
        questionType: "multipleChoices",
        question: "",
        description: "",
        answers: [],
    };
    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleRemoveAnswer = (answerIndex: number) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) }));

    handleUpdateAnswer = (answerIndex: number, newAnswer: { correct: boolean; answer: string }) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));

    handleAddAnswer = (newAnswer: { correct: boolean; answer: string }) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));

    render() {
        const {
            props: { questionNumber, questionIndex, removeQuestion },
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
                                        onChange={(e: any) =>
                                            handleUpdateAnswer(answerIndex, { correct: false, answer: e.target.value })}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="radio-answer align-center">
                        <RaisedButton
                            label="More option"
                            primary={true}
                            onClick={e => handleAddAnswer({ correct: false, answer: "" })}
                        />
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
    removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
    updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(MultipleChoicesQuestion);
