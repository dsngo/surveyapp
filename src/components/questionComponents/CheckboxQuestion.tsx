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
    handleChangeQuestion = (newQuestion: string) => this.setState(prevState => ({ ...prevState, question: newQuestion }));

    handleChangeDescription = (newDescription: string) =>
        this.setState(prevState => ({ ...prevState, description: newDescription }));

    handleRemoveAnswer = (answerIndex: number) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) && prevState.answers }));
    };

    handleUpdateAnswer = (answerIndex: number, newAnswer: string) =>
        this.setState(prevState => ({
            ...prevState, answers: prevState.answers.map(
                (ans: any, index) => { index === answerIndex ? ans.text = newAnswer : ""; return ans; }
            )
        }))

    handleAddAnswer = () =>
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push({ correct: false, text: "", chosen: false }) && prevState.answers }));

    handleUpdateCorrect = (answerIndex: number) => 
    this.setState(prevState => ({
        ...prevState,
        answers: prevState.answers.map((answer, answerIdx) => {
            answerIdx === answerIndex ? answer.correct = !answer.correct : "";
            return answer;
        })
    }))
    
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
    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            question: this.props.questionData.question,
            description: this.props.questionData.description,
            answers: this.props.questionData.answers
        }))
    }
    renderCreateForm() {
        const {
            props: { questionIndex, removeQuestion, questionData },
            handleChangeQuestion,
            handleChangeDescription,
            handleUpdateAnswer,
            handleAddAnswer,
            handleRemoveAnswer,
        } = this;
        const { question, answers, description } = this.props.questionData;
        console.log(questionData);
        
        return (
            <div>
                <div className="input-field input-text-radio input-option-create padding-bottom-25">
                    <TextField
                        name="questionText"
                        hintText="Long question"
                        multiLine
                        fullWidth
                        value={question}
                        onChange={(e: any) => handleChangeQuestion(e.target.value)}
                        floatingLabelText={`Question ${questionIndex + 1}`}
                    />
                    <TextField
                        name="answerText"
                        hintText="Add an answer here."
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
                                    <div className="check-box">
                                        <Checkbox
                                            onCheck={e => {
                                                this.handleUpdateCorrect(answerIndex);
                                            }}
                                            label={""}
                                        />
                                    </div>
                                    <div className="icon-radio clear-fix">
                                        <i className="material-icons">check_circle</i>
                                    </div>
                                    <div className="input-field input-text-radio">
                                        <TextField
                                            name="answerText"
                                            hintText="Add an answer here."
                                            fullWidth
                                            value={answer.text}
                                            onChange={(e: any) =>
                                                handleUpdateAnswer(answerIndex, e.target.value)}

                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="radio-answer align-center">
                            <RaisedButton
                                label="More option"
                                primary={true}
                                onClick={e => handleAddAnswer()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        if (this.state.completed !== true) return (
            <div className="question-component">
                {
                    this.renderCreateForm()
                }
            </div>
        )
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
