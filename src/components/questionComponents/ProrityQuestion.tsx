import * as React from "react";
import { connect } from "react-redux";
import { addNewQuestion, removeQuestion, updateQuestion } from "../redux/actionCreators";
import TextField from "material-ui/TextField";
import { IPriorityQuestion } from "../../types/customTypes";
import RaisedButton from "material-ui/RaisedButton";

class PriorityQuestion extends React.Component<
    {
        questionNumber: number,
        questionIndex: number,
        addNewQuestion: (questionIndex: number, questionData: any) => any,
        removeQuestion: (questionIndex: number) => any,
        updateQuestion: (questionIndex: number, questionData: any) => any,
    },
    IPriorityQuestion
> {
    state: IPriorityQuestion = {
        questionType: "priorityQuestion",
        question: "",
        description: "",
        answers: [],
        additionalContents: []
    };
    handleChangeQuestion = (newQuestion: string) => {
        this.setState(prevState => ({ ...prevState, question: newQuestion }));
    };
    handleRemoveAnswer = (answerIndex: number) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.splice(answerIndex, 1) }));
    };
    handleUpdateAnswer = (answerIndex: number, newAnswer: { priority: number; answer: string }) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));
    };
    handleAddAnswer = (newAnswer: { priority: number; answer: string }) => {
        this.setState(prevState => ({ ...prevState, answers: prevState.answers.push(newAnswer) }));
    };
    handleAddAdditionalContent = (newAdditionalContent: { description: string; contents: { question: string; answers: string }[]}) => {
        this.setState(prevState => ({ 
            ...prevState, 
            additionalContents: prevState.additionalContents.push(newAdditionalContent) && prevState.additionalContents 
        }));
    }
    handleUpdateAndditionalContentDesciption = (contentIndex: number, value: string) => {
        this.setState(prevState => ({ 
            ...prevState,
            additionalContents: prevState.additionalContents.map((elm, index) => { index === contentIndex ? elm.description = value : ""; return elm;})
        }))
    }
    handleAddQuestionAdditionContent = (contentIndex: number, newQuestion: { question: string, answers: string}) => {
        this.setState(prevState => ({ 
            ...prevState,
            additionalContents: prevState.additionalContents.map((elm, index) => { index === contentIndex ? elm.contents.push(newQuestion) : ""; return elm;})
        }))
    }
    handleUpdateAdditionQuestion = (contentIndex: number, contentQuestionIndex: number, value: string) => {
        this.setState(prevState => ({
            ...prevState,
            additionalContents: prevState.additionalContents.map((elm, index) => { 
                index === contentIndex ? elm.contents.map((elmContent, elmContentIndex) => { 
                    contentQuestionIndex  ===  elmContentIndex ? elmContent.question = value : ""; 
                    return elmContent;
                }) : ""; 
                return elm;
            })
        }))
    }

    render() {
        const {
            props: { questionNumber, questionIndex, removeQuestion },
            state: { question, answers, additionalContents },
            handleChangeQuestion,
            handleUpdateAnswer,
            handleAddAnswer,
            handleRemoveAnswer,
            handleAddAdditionalContent,
            handleUpdateAndditionalContentDesciption,
            handleUpdateAdditionQuestion
        } = this;
        return (
            <div>
                <TextField
                    name="questionText"
                    hintText="Priority question"
                    multiLine
                    fullWidth
                    rows={2}
                    value={question}
                    onChange={(e: any) => handleChangeQuestion(e.target.value)}
                    floatingLabelText={`Question ${questionNumber}`}
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
                                    <i className="material-icons">equalizer</i>
                                </div>
                                <div className="input-field input-text-radio input-option-create">
                                    <TextField
                                        name="answerText"
                                        hintText="Add an answer here."
                                        fullWidth
                                        value={answer}
                                        onChange={(e: any) =>
                                            handleUpdateAnswer(answerIndex, { priority: 0, answer: e.target.value })}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div className="radio-answer align-center">
                        <RaisedButton
                            label="More option"
                            primary={true}
                            onClick={e => handleAddAnswer({ priority: 0, answer: "" })}
                        />
                        <RaisedButton
                            label="Additional Content"
                            primary={true}
                            onClick={e => handleAddAdditionalContent({ description: "", contents: [] })}
                        />
                    </div>
                </div>
                <div className="additional-detail">
                    {
                        additionalContents.map((content, contentIndex) => {
                            return (
                                <div>
                                <TextField
                                        name="answerText"
                                        hintText="Add description here."
                                        fullWidth
                                        value={content.description}
                                        onChange={(e: any) =>
                                            handleUpdateAndditionalContentDesciption(contentIndex, e.target.value)}
                                    />
                                    {
                                        content.contents.map((ctn, ctnQuestionIndex) => {
                                            return (
                                                <div>
                                                    <TextField
                                                        name="answerText"
                                                        hintText="Add an answer here."
                                                        fullWidth
                                                        value={ ctn.question }
                                                        onChange={ (e: any) => handleUpdateAdditionQuestion(contentIndex, ctnQuestionIndex, e.target.value)}
                                                    />
                                                    ctn.
                                                </div>
                                            )

                                        })     
                                    }
                                    <RaisedButton
                                        label="Add question"
                                        primary={true}
                                        onClick={e => handleAddAdditionalContent({ description: "", contents: [] })}
                                    />
                                </div>
                            )}

                        )
                    }
                </div>
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
    updateQuestion: (questionIndex: number, questionData: any) => dispatch(updateQuestion(questionIndex, questionData)),
});

export default connect(null, mapDispatchToProps)(PriorityQuestion);