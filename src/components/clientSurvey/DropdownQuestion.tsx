import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class DropdownQuestion extends React.Component<
    {
        questionData: any;
        questionIndex: number;
        removeQuestion: (questionIndex: number) => any;
        updateQuestion: (questionIndex: number, questionData: any) => any;
    },
    IDropdown
    > {
    state: IDropdown = {
        questionType: "dropdown",
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


    getCurrentSelection = () => {
        for(let i = 0; i < this.state.answers.length; i++) {
            console.log(i);
            
            if (this.state.answers[i].chosen === true) return i;
        }
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
                    <SelectField
                            floatingLabelText="Answer"
                            fullWidth={true}
                            value={ this.getCurrentSelection() }
                            onChange={(event: object, key: number, payload: any) => {
                                this.handleChooseAnswer(payload);
                            }}
                            className="mui-select"
                        >
                            {answers.map((answer: any, key: any) => {
                                return (
                                    <MenuItem value={key} label={answer.answer} key={key}>
                                        {" "}
                                        {answer.answer}
                                        {" "}
                                    </MenuItem>
                                );
                            })}
                    </SelectField>
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

export default connect(null, mapDispatchToProps)(DropdownQuestion);
