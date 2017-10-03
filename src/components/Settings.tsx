import * as React from "react";
import { addArea, divideSection } from "./redux/actionCreators";
import { connect } from "react-redux";
interface ISettings {
    addArea: (area: any) => string;
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
    const areaDescriptionTemplate = {
        type: "description",
        title: "",
        description: "",
    };
    return (
        <div className="menu-settings">
            <div>
                <div className="settings-icon add-question" onClick={e => addArea(areaQuestionTemplate)}>
                    <i className="fa fa-plus-circle" />
                </div>
            </div>
            <div>
                <div className="settings-icon add-text" onClick={e => addArea(areaDescriptionTemplate)}>
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
    divideSection: (value: boolean) => dispatch(divideSection(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
