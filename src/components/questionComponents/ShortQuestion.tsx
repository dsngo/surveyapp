import * as React from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import { IShortQuestion } from "../../types/customTypes";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";

class ShortQuestion extends React.Component<
    {
        questionNumber: number;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IShortQuestion
> {
    state: IShortQuestion = {
        questionType: "shortQuestion",
        question: "",
        answers: [""],
    };

    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

    getAnswerString(answers: string[]) {
        return answers.join("\n");
    }

    render() {
        const {
            props: { questionNumber, removeQuestion, questionIndex },
            state: { question, answers, description },
            handleChangeQuestion,
            handleChangeDescription,
            handleUpdateAnswer,
            getAnswerString,
        } = this;
        return (
            <div>
                <div className="delete-area" onClick={e => removeQuestion(questionIndex)}>
                    <i className="fa fa-times" />
                </div>
                <TextField
                    name="questionText"
                    hintText="Short question"
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
                <TextField
                    name="answerText"
                    hintText="Put your answer here"
                    multiLine
                    fullWidth
                    rows={2}
                    value={getAnswerString(answers)}
                    onChange={(e: any) => handleUpdateAnswer(e.target.value)}
                    floatingLabelText="Answer"
                />
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

export default connect(null, mapDispatchToProps)(ShortQuestion);
