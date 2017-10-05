import * as React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { IMultipleDropdown } from "../../types/customTypes";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";

interface IDropdownQuestion {
    id: number;
    text: string;
}

interface IDropdownAnswer {
    answerId: number;
    contents: { id: number; answers: string[] }[];
}

class MultipleDropdownQuestion extends React.Component<
    {
        questionNumber: number;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IMultipleDropdown
> {
    state: IMultipleDropdown = {
        questionType: "multipleDropdown",
        questions: [{ id: 1, text: "" }],
        description: "",
        answers: [{ answerId: 1, contents: [{ id: 1, answers: [""] }] }],
    };

    handleChangeQuestion = (questionId: number, newQuestion: IDropdownQuestion) =>
        this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleRemoveAnswer = (answerIndex: number) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) }));

    handleUpdateAnswer = (answerIndex: number, newAnswer: IDropdownAnswer) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1, newAnswer) }));

    handleAddAnswer = (newAnswer: IDropdownAnswer) =>
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
                        <FloatingActionButton onClick={e => handleAddAnswer({ correct: false, answer: "" })}>
                            <ContentAdd />
                        </FloatingActionButton>
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

export default connect(null, mapDispatchToProps)(MultipleDropdownQuestion);
