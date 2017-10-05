import * as React from "react";
import { connect } from "react-redux";
import { addNewQuestion, removeQuestion, updateQuestion } from "./redux/actionCreators";
import TextField from "material-ui/TextField";
import { IShortQuestion } from "../types/customTypes";

class ShortQuestion extends React.Component<
    {
        questionNumber: number,
        questionIndex: number,
        addNewQuestion: (questionIndex: number, questionData: any) => any,
        removeQuestion: (questionIndex: number) => any,
        updateQuestion: (questionIndex: number, questionData: any) => any,
    },
    IShortQuestion
> {
    state: IShortQuestion = {
        questionType: "shortQuestion",
        question: "",
        answers: [""],
    };
    handleChangeQuestion = (newQuestion: string) => {
        this.setState(prevState => ({ ...prevState, question: newQuestion }));
    };
    handleUpdateAnswer = (newAnswer: string) => {
        this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));
    };
    getAnswerString(answers: string[]) {
        return answers.join("\n");
    } 
    render() {
        const {
            props: { questionNumber, removeQuestion },
            state: { question, answers },
            handleChangeQuestion,
            handleUpdateAnswer,
            getAnswerString,
        } = this;
        return (
            <div>
                <TextField
                    name="questionText"
                    hintText="Short question"
                    multiLine
                    fullWidth
                    rows={2}
                    value={question}
                    onChange={(e: any) => handleChangeQuestion(e.target.value)}
                    floatingLabelText={`Question ${questionNumber}`}
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
    addNewQuestion: (questionIndex: number, questionData: any) => dispatch(addNewQuestion(questionIndex, questionData)),
    removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
    updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData))
});

export default connect(null, mapDispatchToProps)(ShortQuestion);
