import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class ShortQuestion extends React.Component<
    {
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IShortQuestion
> {
    state: IShortQuestion = {
        questionType: "shortQuestion",
        question: "What's your favorite sport?",
        description: "Whatever",
        answers: [""],
        completed: true
    };

    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

    getAnswerString(answers: string[]) {
        return answers.join("\n");
    }

    renderClientForm() {
        return (
            <div>
                <div className="question-info">
                    <div className="question">{this.state.question}</div>
                    <div className="description">{this.state.description}</div>
                </div>
                <div className="padding-25-except-top">
                    <TextField
                        name="answerText"
                        hintText="Put your answer here"
                        multiLine
                        fullWidth
                        rows={2}
                        value={this.getAnswerString(this.state.answers)}
                        onChange={(e: any) => this.handleUpdateAnswer(e.target.value)}
                        floatingLabelText="Answer"
                    />
                </div>
            </div>
        )
    }

    renderFromCreate() {
        const {
            props: { removeQuestion, questionIndex },
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
                <div className="padding-25-except-top">
                    <TextField
                        name="questionText"
                        hintText="Short question"
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
                </div>
               
            </div>
        )
    }
    render() {
        
        return (
            <div>
                {
                    this.state.completed === false ? (
                        this.renderFromCreate()
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

export default connect(null, mapDispatchToProps)(ShortQuestion);
