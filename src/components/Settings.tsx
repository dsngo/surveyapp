import * as React from "react";
import { addArea, addNewQuestion, divideSection } from "./redux/actionCreators";
import { connect } from "react-redux";
import * as Types from "../types/customTypes";

interface ISettings {
    addArea: (area: any) => string;
    // addNewQuestion: (questionData: any) => any;
    surveyData: any[];
    divideSection: (value: boolean) => any;
}

const Settings: React.SFC<ISettings> = props => {
    const { addArea, surveyData, divideSection } = props;
    const areaQuestionTemplate = {
        type: "question",
        questionType: "",
        multipleAnswer: [],
        question: "",
    };
    const newQuestion:Types.IShortQuestion = {
        questionType: "shortQuestion",
        question: "",
        description: "",
        answers: []
    }
    return (
        <div className="menu-settings">
            <div>
                <div className="settings-icon add-question">
                    <i className="fa fa-plus-circle" />
                </div>
            </div>
            <div>
                <div className="settings-icon add-text" >
                    <i className="fa fa-font" aria-hidden="true" />
                </div>
            </div>
            <div>
                <div className="settings-icon">
                    <i className="fa fa-picture-o" aria-hidden="true" onClick={e => divideSection(true)} />
                </div>
            </div>
            <div>
                <div className="settings-icon">
                    <i className="fa fa-youtube-play" aria-hidden="true" />
                </div>
            </div>
            <div>
                <div className="settings-icon">
                    <i className="fa fa-bars" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
});

const mapDispatchToProps = (dispatch: any) => ({
    addArea: (area: any) => dispatch(addArea(area)),
    // addNewQuestion: (questionData: any) => dispatch(addNewQuestion(questionData)),
    divideSection: (value: boolean) => dispatch(divideSection(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
