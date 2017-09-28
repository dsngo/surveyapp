import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Scrollbars from "react-custom-scrollbars";
import { push } from "react-router-redux";
import Settings from "./Settings";
import AnswerOption from "./AnswerOption";
import CreateSurveyAreaList from "./CreateSurveyAreaList";
import { changeTypeAnswer, deleteArea, chooseArea, updateDescriptionArea, updateInfoSurvey, createSurvey, clearMessage } from "./redux/actionCreators";
import { withRouter } from "react-router-dom";

interface ISurveyForm {
    surveyData: any;
    currentArea: number;
    updateInfoSurvey: (field: string, value: string) => any;
    createSurvey: () => any;
    clearMessage: () => any;
    changeUrl: (url: string) => any;
}

class SurveyForm extends React.Component<ISurveyForm> {
    private scrollBars: Scrollbars;
    private tempLengthArea: number;
    constructor(props: any){
        super(props);
        this.tempLengthArea = this.props.surveyData.content.length;
    }
    componentDidUpdate() {
        if (this.props.surveyData.content.length > this.tempLengthArea) {
            this.scrollBars.scrollToBottom();
            this.tempLengthArea = this.props.surveyData.content.length;
        }
        if (this.props.surveyData.msgSuccess) {
            alert('Create survey success');
            window.location.href = "/";
        }
    }
    
    render() {
        return (
            <Scrollbars id="scroll-survey-form" ref={(bar: any) => { this.scrollBars = bar;}} style={{ height: "calc(100vh - 65px)", width: "100vw"}} autoHide>
                <div className="row survey-form-create">
                    <div className="container survey-form" style={{ paddingTop: "15px" }}>
                        <Settings />
                        <div className="form-create clear-fix">
                            <div className="tabs clear-fix">
                                <div className="questions-tab active-tab">QUESTIONS</div>
                                <div className="responses-tab">RESPONSES</div>
                            </div>
                            <div className="form-content">
                            <div className='form-title'>
                                <div className='group'>
                                    <input type='text' required value={ this.props.surveyData.info.title } onChange={ e => this.props.updateInfoSurvey("title", e.target.value)}/>
                                    <span className='highlight' />
                                    <span className='bar' />
                                    <label>Title</label>
                                </div>
                            </div>
                            <div className='form-description'>
                                <div className='group'>
                                    <input type='text' required value={ this.props.surveyData.info.description } onChange={ e => this.props.updateInfoSurvey("description", e.target.value)} />
                                    <span className='highlight' />
                                    <span className='bar' />
                                    <label>Description</label>
                                </div>
                            </div>
                                <CreateSurveyAreaList />
                            </div>
                        </div>
                        <div className="btn-save-survey-container" onClick={ e => this.props.createSurvey() }>
                            <a className="waves-effect waves-light btn btn-save-survey green">Save</a>
                        </div>
                        { 
                            this.props.surveyData.msgError ? (
                                <div className="error-message">
                                    {this.props.surveyData.msgError}
                                </div>
                            ) : (
                                <div>
    
                                </div>
                            )
                        }
                    </div>
                </div>
            </Scrollbars>
        );
    }
}
// const SurveyForm: React.SFC<ISurveyForm> = props => {
//     const { surveyData, updateInfoSurvey, createSurvey } = props;
    
// };

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
    currentArea: state.currentArea
});

const mapDispatchToProps = (dispatch: any) => ({
    updateInfoSurvey: (field: string, value: string) => dispatch(updateInfoSurvey(field, value)),
    createSurvey: () => dispatch(createSurvey()),
    clearMessage: () => dispatch(clearMessage()),
    changeUrl: (url: any) => dispatch(push(url))
});

export default connect (mapStateToProps, mapDispatchToProps) (SurveyForm);
