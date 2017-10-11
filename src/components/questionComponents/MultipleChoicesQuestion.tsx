import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IMultipleChoices } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

class MultipleChoicesQuestion extends React.Component<
    {
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IMultipleChoices
    > {
    state: IMultipleChoices = {
        questionType: "multipleChoices",
        question: "Do you like programming?",
        description: "Your desire",
        answers: [{
            correct: false,
            answer: "Yes. I really love programming."
        }, {
            correct: false,
            answer: "No. I prefer traveling."
        }],
        completed: true
    };
    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleRemoveAnswer = (answerIndex: number) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) && prevState.answers }));

    handleUpdateAnswer = (answerIndex: number, newAnswer: { correct: boolean; answer: string }) =>
        this.setState(prevState => ({
            ...prevState, answers: prevState.answers.map(
                (ans: any, index) => { index === answerIndex ? ans.answer = newAnswer.answer : ""; return ans; }
            )
        }))

    handleAddAnswer = (newAnswer: { correct: boolean; answer: string }) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) && prevState.answers }));

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
                <div className="padding-25-except-top">
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
                                            value={answer.answer}
                                            onChange={(e: any) =>
                                                handleUpdateAnswer(answerIndex, { correct: false, answer: e.target.value })}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="radio-answer align-center">
                            <FloatingActionButton mini onClick={e => handleAddAnswer({ correct: false, answer: "" })}>
                                <ContentAdd />
                            </FloatingActionButton>
                            {/* <RaisedButton
                                label="More option"
                                primary={true}
                                onClick={e => handleAddAnswer({ correct: false, answer: "" })}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderClientForm() {
        const { state: { question, description, answers } } = this;
        return (
            <div>
                <div className="question-info">
                    <div className="question">
                        {question}
                    </div>
                    <div className="description">
                        {description}
                    </div>
                </div>
                <div className="padding-25">
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                        {answers.map((answer: any, key: any) => {
                            return (
                                <RadioButton
                                    key={key}
                                    value={answer.answer}
                                    label={answer.answer}
                                />
                            );
                        })}
                    </RadioButtonGroup>
                </div>
            </div>
        )
    }
    render() {

        return (
            <div>
                {
                    this.state.completed === false ? (
                        this.renderCreateForm()
                    ) : (
                            this.renderClientForm()
                        )
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

export default connect(null, mapDispatchToProps)(MultipleChoicesQuestion);
