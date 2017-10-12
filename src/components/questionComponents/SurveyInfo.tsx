import * as React from "react";
import { removeQuestion, updateQuestion } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class SurveyInfo extends React.Component<
    {
        updateSurveyInfo: (title: string, description: string) => any;
    }
> {
    state = {
        title: "",
        description: "",
        completed: true
    };

    handleChangeTitle = (title: string) => 
        this.setState(prevState => ({
            ...prevState,
            title: title
        }))
    
    handleChangeDescription = (description: string) => 
        this.setState(prevState => ({
            ...prevState,
            description: description
        }))

    renderClientForm() {
        return (
            <div className="input-option-create">
                <div className="padding-25-except-top ">
                    <div className="survey-title">
                        { this.state.title }
                    </div>
                    <div className="survey-description">
                        { this.state.description}
                    </div>
                </div>
            </div>
        )
    }

    renderFromCreate() {
        return (
            <div>
                <div className="padding-25-except-top input-option-create">
                    <TextField
                        name="surveyTitle"
                        hintText="Title"
                        fullWidth
                        value={this.state.title}
                        onChange={(e: any) => this.handleChangeTitle(e.target.value)}
                        floatingLabelText="Title"
                    />
                    <TextField
                        name="surveyDescription"
                        hintText="Description"
                        multiLine
                        fullWidth
                        value={this.state.description}
                        onChange={(e: any) => this.handleChangeDescription(e.target.value)}
                        floatingLabelText="Description"
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

export default connect(null, mapDispatchToProps)(SurveyInfo);
