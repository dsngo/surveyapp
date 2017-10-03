import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Scrollbars from "react-custom-scrollbars";
import { getSurveySubmitById } from "./redux/actionCreators";

import StatusComponent from "./Status";


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { updateAnswer, submitResponse } from "./redux/actionCreators";



interface IFormSubmit {
    surveyResponse: any;
    match: any;
    surveySubmit: any;
    submitResponse: (id: string) => any;
    getSurveySubmitById: (id: string) => any;
    updateAnswer: (index: number, answer: string, multiAnswer: boolean) => any;
}

class FormSubmit extends React.Component<IFormSubmit> {
    private scrollBars: Scrollbars;
    state = {
        open: false,
        survey_id: ""
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        console.log('close');
        
        this.setState({open: false});
    };
    
    componentWillMount() {
        let id = this.props.match.params.id;
        this.state.survey_id = id;
        this.props.getSurveySubmitById(id);
    }

    renderAnswers(field: any, index: number) {
        if (field.answer_type === "short_answer") return (
            <TextField 
                name="question_text"
                hintText="" 
                fullWidth={ true } 
                onChange={ (e:any) => this.props.updateAnswer(index, e.target.value, false) }
            />
        );
        if (field.answer_type === "long_answer") return (
            <div>
                <TextField
                    onChange={ (e:any) => this.props.updateAnswer(index, e.target.value, false) }
                    multiLine={true}
                    rows={ 3 }
                    fullWidth={ true }
                    name="question_text"
                /><br />
            </div>
        )
        if (field.answer_type === "checkbox") {
            return field.multiple_answer.map((answer: any, key: any) => {
                let id = "question_" + index + "_" + key;
                return (
                    <div>
                        <Checkbox onCheck={ e => { this.props.updateAnswer(index, answer, true) }}
                            label={ answer }
                            key={ id }
                        />
                    </div>
                )
            })
            
        }
        if (field.answer_type === "multiple_choice") {
            return (
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                    {
                        field.multiple_answer.map((answer: any, key: any) => {
                            let id = "question_" + index + "_" + key;
                            return (
                                <RadioButton 
                                key={id}
                                value={ answer }
                                label={ answer }
                                onChange={ e => { this.props.updateAnswer(index, answer, false)}}
                              />
                            )
                        })
                    }
                </RadioButtonGroup>
            )
            
        }
        if (field.answer_type === "dropdown") {
            return (
                <div>
                    <SelectField floatingLabelText="Answer" fullWidth={ true } value={ field.answer } onChange={ (event: object, key: number, payload: any) => { this.props.updateAnswer(index, payload, false)}} className="mui-select">
                        {
                            field.multiple_answer.map((answer: any, key: any) => {
                                let id = "question_" + index + "_" + key;
                                return (
                                    <MenuItem value={ answer } label={ answer } key={id}> { answer } </MenuItem>
                                )
                            })
                        }
                    </SelectField>
                </div>
            )
        }
    }
    renderFields() {
        let content = this.props.surveySubmit.survey.content;
        if (content) content = JSON.parse(content);
        return this.props.surveyResponse.question.map((field: any, index: number) => {
            if (field.type === "question") {
                return (
                    <div className="question-field" key={ index }>
                        <div className="question">
                            { field.question }
                        </div>
                        <div className="answer">
                            {
                                this.renderAnswers(field, index)
                            }
                        </div>
                    </div>
                )
            }
            if (field.type === "description") {
                return (
                    <div className="description-field" key={index}>

                    </div>
                )
            }
        })
    }

    handleSubmit = () => {
        this.handleClose(); 
        this.props.submitResponse(this.state.survey_id);
    }

    renderForm() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={ e => { this.handleSubmit() }}
            />,
          ];
        return (
            this.props.surveySubmit.error  === true ? (
                <div className="container">
                    <div className="error-message-container">
                        Sorry, we can't get your survey.<br/>
                        Detail : { this.props.surveySubmit.errorMsg }
                    </div>
                </div>
                
            ) : (
                <div>
                    <Scrollbars id="scroll-survey-form" className="form-submit" ref={(bar: any) => { this.scrollBars = bar;}} style={{ height: "calc(100vh - 65px)", width: "100vw"}} autoHide>
                    <div className="row">
                        <div className="survey-form container" style={{ paddingTop: "15px" }}>
                            <div className="form-create clear-fix">
                                <div className="form-content">
                                    <div className="form-info">
                                        <div className="form-title">
                                            { this.props.surveySubmit.survey.title }
                                        </div>
                                        <div className="form-description">
                                            { this.props.surveySubmit.survey.description }
                                        </div>
                                    </div>
                                    <div className="form-list">
                                        {
                                            this.renderFields()
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="btn-save-survey-container">
                                <RaisedButton
                                backgroundColor="#4CAF50"
                                className="btn-save"
                                label="Submit"
                                onClick={ e => this.handleOpen() }
                                />
                            </div>
                            <Dialog
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                                >
                                Are you sure to submit this response?
                            </Dialog>
                        </div>
                    </div>
                </Scrollbars>
                <StatusComponent />
                </div>
            )
        )
    }

    render() {
        console.log(this.props.surveyResponse);
        return (
            this.props.surveySubmit.loading ? (
                <div className="progress green">
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <div className="form-submit">
                    {
                        this.renderForm()
                    }
                </div>
            )
            
        )
    }
}

const mapStateToProps = (state: any) => ({
    surveySubmit: state.surveySubmit,
    surveyResponse: state.surveyResponse
});

const mapDispatchToProps = (dispatch: any) => ({
    updateAnswer: (index: number, answer: string, multiAnswer: boolean) => dispatch(updateAnswer(index, answer, multiAnswer)),
    getSurveySubmitById: (id: string) => dispatch(getSurveySubmitById(id)),
    submitResponse: (id: string) => dispatch(submitResponse(id))
})

export default connect (mapStateToProps, mapDispatchToProps) (FormSubmit);