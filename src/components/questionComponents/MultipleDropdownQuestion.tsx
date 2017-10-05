import * as React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { IMultipleDropdown } from "../../types/customTypes";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";

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
        question: "",
        description: "",
        headers: [{ headerId: 1, text: "", answerOptions: [""] }],
        answers: [{ answerId: 1, correct: false, contents: [{ refId: 1, textAnswer: "" }] }],
    };

    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleChangeHeader = (headerId: number, text: string, answerOptions: string[]) =>
        this.setState(prevState => ({
            ...prevState,
            headers: prevState.headers.map(e => (e.headerId === headerId ? { headerId, text, answerOptions } : e)),
        }));

    handleRemoveAnswer = (answerIndex: number) =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.filter(e => e.answerId !== answerIndex) }));

    handleUpdateAnswer = (answerIndex: number, newAnswer: IMultipleDropdown["answers"][any]) =>
        this.setState(prevState => ({
            ...prevState,
            answers: prevState.answers.map(e => (e.answerId === answerIndex ? newAnswer : e)),
        }));

    handleAddAnswer = () => {
        const { headers, answers } = this.state;
        const answerId = answers.length + 1;
        const contents: IMultipleDropdown["answer"][0]["contents"] = [];
        const hLen = headers.length;
        for (let i = 1; i <= hLen; i += 1) {
            contents.push({ refId: i, textAnswer: "" });
        }
        return this.setState(prevState => ({
            ...prevState,
            answers: [...prevState.answers, { answerId, contents, correct: false }],
        }));
    };

    render() {
        const {
            props: { questionNumber, questionIndex, removeQuestion },
            state: { question, answers, description, headers },
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn tooltip="Correct Answer"> Check Box</TableHeaderColumn>
                            {headers.forEach(e => <TableHeaderColumn tooltip="The ID">{e.text}</TableHeaderColumn>)}
                        </TableRow>
                    </TableHeader>
                </Table>

                <div className="clear-fix multiple-answer">
                    {answers.forEach((answer: any, answerIndex: number) => (
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
                                        handleUpdateAnswer(answerIndex, { correct, contents, answerId: answerIndex })}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="radio-answer align-center">
                        <FloatingActionButton onClick={e => handleAddAnswer()}>
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