import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { ICheckBox } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";

class CheckboxQuestion extends React.Component<
    {
        questionData: any;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    ICheckBox
    > {
    state: ICheckBox = {
        questionType: "checkbox",
        question: "",
        description: "",
        answers: [{
            correct: false,
            text: "",
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


    updateAnswer = (indexAnswer: number) => {
        this.setState(prevState => ({
            ...prevState, answers: prevState.answers.map((answer, index) => {
                index === indexAnswer ? answer.chosen = !answer.chosen : ""; return answer;
            })
        }));
    }

    renderClientForm = () => {
        const {
            props: { questionIndex, removeQuestion, questionData },
        } = this;
        const { question, answers, description } = questionData;
        
        return (
            <div className="input-option-create">
                <div className="question-field" >
                    <div className="question-info">
                        <div className="question">{question}</div>
                        <div className="description">{description}</div>
                    </div>
                    <div className="answer padding-25">
                        {
                            answers.map((answer: any, key: any) => {
                                const id = "question_" + "_" + key;
                                return (
                                    <div>
                                        <Checkbox
                                            onCheck={e => {
                                                this.updateAnswer(key);
                                            }}
                                            label={answer.text}
                                            key={id}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
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
        )
    }

    componentDidUpdate() {
        return this.props.updateQuestion(this.props.questionIndex, this.state);
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    removeQuestion: (questionIndex: number) => dispatch(removeQuestion(questionIndex)),
    updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(CheckboxQuestion);
