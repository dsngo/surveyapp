import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class ShortQuestion extends React.Component<
    {
        questionData: any;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IShortQuestion
> {
    state: IShortQuestion = {
        questionType: "shortQuestion",
        question: "",
        description: "",
        answers: [""],
        completed: false
    };

    handleUpdateAnswer = (newAnswer: string) => this.setState(prevState => ({ ...prevState, answers: newAnswer.split("\n") }));

    getAnswerString(answers: string[]) {
        return answers.join("\n");
    }

    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            question: this.props.questionData.question,
            description: this.props.questionData.description
        }))
    }

    renderClientForm() {
        return (
            <div className="input-option-create">
                <div className="question-info question-client-survey">
                    <div className="question">{this.props.questionData.question}</div>
                    <div className="description">{this.props.questionData.description}</div>
                </div>
                <div className="">
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

    
    render() {
        
        return (
            <div className="question-component">
                {
                    this.renderClientForm()
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
