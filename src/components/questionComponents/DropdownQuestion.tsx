import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class DropdownQuestion extends React.Component<
    {
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IDropdown
    > {
    state: IDropdown = {
        questionType: "dropdown",
        question: "Your profession",
        description: "Career",
        answers: [{
            correct: true,
            answer: "Developer"
        }, {
            correct: false,
            answer: "Designer"
        }],
        completed: false
    };

    getCurrentSelection = () => {
        for(let i = 0; i < this.state.answers.length; i++) {
            console.log(i);
            
            if (this.state.answers[i].correct === true) return i;
        }
    }

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
    handleChooseAnswer = (answerIndex: any) => {
        this.setState(prevState => ({
            ...prevState, answers: prevState.answers.map(
                (ans: any, index: number) => {index === answerIndex ? ans.correct = true : ans.correct = false; return ans;}
            )
        }))
    }
    handleAddAnswer = (newAnswer: { correct: boolean; answer: string }) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) && prevState.answers }));

    renderClientForm() {
        const { state: { question, description, answers } } = this;
        return (
            <div className="input-option-create">
                <div className="question-info">
                    <div className="question">
                        {question}
                    </div>
                    <div className="description">
                        {description}
                    </div>
                </div>
                <div className="padding-25">
                    <SelectField
                            floatingLabelText="Answer"
                            fullWidth={true}
                            value={ this.getCurrentSelection() }
                            onChange={(event: object, key: number, payload: any) => {
                                this.handleChooseAnswer(payload);
                            }}
                            className="mui-select"
                        >
                            {answers.map((answer: any, key: any) => {
                                return (
                                    <MenuItem value={key} label={answer.answer} key={key}>
                                        {" "}
                                        {answer.answer}
                                        {" "}
                                    </MenuItem>
                                );
                            })}
                    </SelectField>
                </div>
            </div>
        )
    }
    renderFormCreate() {
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
                <div className="padding-25-except-top input-option-create">
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
                                        <i className="material-icons">arrow_drop_down_circle</i>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {
                    this.state.completed === false ? (
                        this.renderFormCreate()
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

export default connect(null, mapDispatchToProps)(DropdownQuestion);
