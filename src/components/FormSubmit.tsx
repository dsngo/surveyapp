import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Scrollbars from "react-custom-scrollbars";
import { getSurveySubmitById } from "./redux/actionCreators";
interface IFormSubmit {
    match: any;
    surveySubmit: any;
    getSurveySubmitById: (id: string) => any;
}

class FormSubmit extends React.Component<IFormSubmit> {
    private scrollBars: Scrollbars;
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        this.props.getSurveySubmitById(id);
    }

    renderAnswers(field: any) {
        if (field.answer_type === "short_answer") return (
            <div>
                <input type='text' required />
                <span className='highlight' />
                <span className='bar' />
            </div>
        );
        if (field.answer_type === "long_answer") return (
            <div>
                <textarea id="textarea1" className="materialize-textarea"></textarea>
            </div>
        )
        if (field.answer_type === "checkbox") {
            return field.multiple_answer.map((answer: any, key: any) => {
                let id = "question_1" + key;
                return (
                    <div>
                        <div className="checkbox clear-fix">
                            <input id={ id } className="filled-in" type="checkbox" />
                            <label htmlFor={ id } className="label-checkbox">{ answer }</label>
                        </div>
                    </div>
                )
            })
            
        }
        if (field.answer_type === "multiple_choice") {
            return field.multiple_answer.map((answer: any, key: any) => {
                let id = "question_2" + key;
                return (
                    <div>
                        <input name="group1" type="radio" id={ id } />
                        <label htmlFor={ id }>{ answer }</label>
                    </div>      
                )
            })
        }
        if (field.answer_type === "dropdown") {
            return (
                <div>
                    <ul className="select">
		                <li>
                            <input className="select_close" type="radio" name="awesomeness" id="awesomeness-close" value=""/>
                            <span className="select_label select_label-placeholder">Awesomeness Level</span>
                        </li>
                        
                        <li className="select_items">
                            <input className="select_expand" type="radio" name="awesomeness" id="awesomeness-opener"/>
                            <label className="select_closeLabel" htmlFor="awesomeness-close"></label>
                            
                            <ul className="select_options">
                                <li className="select_option">
                                    <input className="select_input" type="radio" name="awesomeness" id="awesomeness-ridiculous"/>
                                    <label className="select_label" htmlFor="awesomeness-ridiculous">ridiculous</label>
                                </li>

                                <li className="select_option">
                                    <input className="select_input" type="radio" name="awesomeness" id="awesomeness-reasonable"/>
                                    <label className="select_label" htmlFor="awesomeness-reasonable">reasonable</label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        }
        
        
    }
    renderFields() {
        let content = this.props.surveySubmit.survey.content;
        if (content) content = JSON.parse(content);
        return content.map((field: any, index: number) => {
            if (field.type === "question") {
                return (
                    <div className="question-field" key={ index }>
                        <div className="question">
                            { field.question }
                        </div>
                        <div className="answer">
                            {
                                this.renderAnswers(field)
                            }
                        </div>
                    </div>
                )
            }
            if (field.type === "description") {
                return (
                    <div className="description-field">

                    </div>
                )
            }
        })
    }

    renderForm() {
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
                        <div className="survey-form" style={{ paddingTop: "15px" }}>
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
                                <a className="waves-effect waves-light btn btn-save-survey green">Submit</a>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
                </div>
            )
        )
    }

    render() {
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
    surveySubmit: state.surveySubmit
});

const mapDispatchToProps = (dispatch: any) => ({
    getSurveySubmitById: (id: string) => dispatch(getSurveySubmitById(id))
})

export default connect (mapStateToProps, mapDispatchToProps) (FormSubmit);