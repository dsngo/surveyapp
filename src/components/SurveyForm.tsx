import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Scrollbars from "react-custom-scrollbars";
// import { push } from "react-router-redux";
import Settings from "./Settings";
import QuestionOptions from "./AnswerOption";
import CreateSurveyAreaList from "./CreateSurveyAreaList";
import {
    changeTypeAnswer,
    deleteArea,
    chooseArea,
    updateDescriptionArea,
    updateInfoSurvey,
    saveSurvey,
    clearMessage,
    getSurveyById,
    clearSurvey,
} from "./redux/actionCreators";
import { withRouter } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Visibility from "material-ui/svg-icons/action/visibility";
import VisibilityOff from "material-ui/svg-icons/action/visibility-off";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { Tabs, Tab } from "material-ui/Tabs";
interface ISurveyForm {
    match: any;
    surveyData: any;
    currentArea: number;
    updateInfoSurvey: (field: string, value: string) => any;
    saveSurvey: () => any;
    clearMessage: () => any;
    getSurveyById: (id: string) => any;
    clearSurvey: () => any;
    // changeUrl: (url: string) => any;
}

class SurveyForm extends React.Component<ISurveyForm> {
    private scrollBars: Scrollbars;
    private tempLengthArea: number;
    state = {
        open: false,
        surveyId: "",
        currentTab: "question",
    };
    constructor(props: any) {
        super(props);
        this.tempLengthArea = this.props.surveyData.content.length;
    }

    componentWillMount() {
        this.props.clearSurvey();
        const id = this.props.match.params.id;
        if (id) {
            this.state.surveyId = id;
            this.props.getSurveyById(id);
        }
    }
    componentDidUpdate() {
        if (this.props.surveyData.content.length > this.tempLengthArea) {
            this.scrollBars.scrollToBottom();
            this.tempLengthArea = this.props.surveyData.content.length;
        }
        if (this.props.surveyData.msgSuccess) {
            alert("Create survey success");
            window.location.href = "/";
        }
    }
    handleChangeTab = (currentTab: any) => {
        this.setState({
            currentTab,
        });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmitSurvey = () => {
        this.props.saveSurvey();
        this.handleClose();
    };
    handlePreview = () => {
        window.location.href = "/form/" + this.props.surveyData.info.id;
    };
    render() {
        console.log(this.props.surveyData);
        
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
            <FlatButton label="Submit" primary={true} onClick={e => this.handleSubmitSurvey()} />,
        ];
        return (
            <Scrollbars
                id="scroll-survey-form"
                ref={(bar: any) => {
                    this.scrollBars = bar;
                }}
                style={{ height: "calc(100vh - 65px)", width: "100%" }}
                autoHide
            >
                <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                    Are you sure to create this survey?
                </Dialog>
                <div className="row survey-form-create">
                    <div className="container survey-form" style={{ paddingTop: "15px" }}>
                        <div className="form-create clear-fix">
                            <Tabs value={this.state.currentTab} onChange={this.handleChangeTab}>
                                <Tab label="Question" value="question">
                                    <Settings />
                                    <div className="form-content">
                                        <div className="form-info">
                                            <div className="form-title">
                                                <TextField
                                                    name="question_text"
                                                    hintText=""
                                                    fullWidth={true}
                                                    value={this.props.surveyData.info.title}
                                                    onChange={(e: any) => this.props.updateInfoSurvey("title", e.target.value)}
                                                    floatingLabelText="Title"
                                                />
                                            </div>
                                            <div className="form-description">
                                                <TextField
                                                    name="question_text"
                                                    hintText=""
                                                    fullWidth={true}
                                                    value={this.props.surveyData.info.description}
                                                    onChange={(e: any) =>
                                                        this.props.updateInfoSurvey("description", e.target.value)}
                                                    floatingLabelText="Description"
                                                />
                                            </div>
                                        </div>

                                        <CreateSurveyAreaList />
                                    </div>
                                </Tab>
                                <Tab label="Responses" value="response" />
                            </Tabs>
                        </div>
                        {this.props.surveyData.info.id ? (
                            <div className="btn-preview-survey-container">
                                <RaisedButton
                                    backgroundColor="#4CAF50"
                                    className="btn-save"
                                    label="Preview"
                                    onClick={e => this.handlePreview()}
                                />
                            </div>
                        ) : (
                            <div />
                        )}
                        <div className="btn-save-survey-container">
                            <RaisedButton
                                backgroundColor="#4CAF50"
                                className="btn-save"
                                label="Save"
                                onClick={e => this.handleOpen()}
                            />
                        </div>

                        {this.props.surveyData.msgError ? (
                            <div className="error-message">{this.props.surveyData.msgError}</div>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </Scrollbars>
        );
    }
}
// const SurveyForm: React.SFC<ISurveyForm> = props => {
//     const { surveyData, updateInfoSurvey, saveSurvey } = props;

// };

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
    currentArea: state.currentArea,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateInfoSurvey: (field: string, value: string) => dispatch(updateInfoSurvey(field, value)),
    saveSurvey: () => dispatch(saveSurvey()),
    clearMessage: () => dispatch(clearMessage()),
    getSurveyById: (id: string) => dispatch(getSurveyById(id)),
    clearSurvey: () => dispatch(clearSurvey()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
