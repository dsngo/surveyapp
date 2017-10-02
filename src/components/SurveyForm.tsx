import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Scrollbars from "react-custom-scrollbars";
// import { push } from "react-router-redux";
import Settings from "./Settings";
import AnswerOption from "./AnswerOption";
import CreateSurveyAreaList from "./CreateSurveyAreaList";
import { changeTypeAnswer, deleteArea, chooseArea, updateDescriptionArea, updateInfoSurvey, createSurvey, clearMessage } from "./redux/actionCreators";
import { withRouter } from "react-router-dom";
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
interface ISurveyForm {
    surveyData: any;
    currentArea: number;
    updateInfoSurvey: (field: string, value: string) => any;
    createSurvey: () => any;
    clearMessage: () => any;
    // changeUrl: (url: string) => any;
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
            <Scrollbars id="scroll-survey-form" ref={(bar: any) => { this.scrollBars = bar;}} style={{ height: "calc(100vh - 65px)", width: "100%"}} autoHide>
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

                                <TextField 
                                    name="question_text"
                                    hintText="" 
                                    fullWidth={ true } 
                                    onChange={ (e:any) => this.props.updateInfoSurvey("title", e.target.value)}
                                    floatingLabelText="Title"
                                />
                            </div>
                            <div className='form-description'>

                                <TextField 
                                    name="question_text"
                                    hintText="" 
                                    fullWidth={ true } 
                                    onChange={ (e:any) => this.props.updateInfoSurvey("description", e.target.value)}
                                    floatingLabelText="Description"
                                />
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
    currentArea: state.currentArea,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateInfoSurvey: (field: string, value: string) => dispatch(updateInfoSurvey(field, value)),
    createSurvey: () => dispatch(createSurvey()),
    clearMessage: () => dispatch(clearMessage()),
    // changeUrl: (url: any) => dispatch(push(url))
});

export default connect (mapStateToProps, mapDispatchToProps) (SurveyForm);
