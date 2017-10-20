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
        questionData: any;
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
        answers: [{
            correct: false,
            answer: "",
            chosen: false
        }],
        completed: false
    };
    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            question: this.props.questionData.question,
            description: this.props.questionData.description,
            answers: this.props.questionData.answers
        }))
    }


    handleChooseAnswer = (answerIndex: any) => {
        this.setState(prevState => ({
            ...prevState, answers: prevState.answers.map(
                (ans: any, index: number) => {index === answerIndex ? ans.chosen = true : ans.chosen = false; return ans;}
            )
        }))
    }

    renderClientForm() {
        const { question, description, answers } = this.props.questionData;
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
                    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={ (event: object, selected: string) => { this.handleChooseAnswer(selected)} }>
                        {answers.map((answer: any, key: any) => {
                            return (
                                <RadioButton
                                    key={key}
                                    value={key}
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

export default connect(null, mapDispatchToProps)(MultipleChoicesQuestion);
