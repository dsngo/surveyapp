import * as React from "react";
import { connect } from "react-redux";
import { addNewQuestion, removeQuestion } from "./redux/actionCreators";
import TextField from "material-ui/TextField";
import { IShortQuestion } from "../types/customTypes";

class ShortQuestion extends React.Component<
    {
        questionNumber: number;
        questionIndex: number;
        addNewQuestion: (questionData: any, questionIndex: number) => any;
        removeQuestion: (questionIndex: number) => any;
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
    handleAddAnswer = (newAnswer: string) => {
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
            handleAddAnswer,
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
                    onChange={(e: any) => handleAddAnswer(e.target.value)}
                    floatingLabelText="Answer"
                />
            </div>
        );
    }
    componentDidUpdate() {
        return this.props.
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    addNewQuestion: (questionData: any, questionIndex: number) => dispatch(addNewQuestion(questionData, questionIndex)),
    removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
});

export default connect(null, mapDispatchToProps)(ShortQuestion);
