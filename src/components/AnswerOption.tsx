import * as React from "react";
import { connect } from "react-redux";
import { addMultipleChoice, updateMultipleChoice, deleteMultipleChoice } from "./redux/actionCreators";

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

interface IQuestionOptions {
    surveyData: any[];
    area: any;
    index: number;
    addMultipleChoice: (index: number) => any;
    updateMultipleChoice: (index: number, questionIndex: number, question: string) => any;
    deleteMultipleChoice: (index: number, questionIndex: number) => any;
}

const QuestionOptions: React.SFC<IQuestionOptions> = props => {
    const { index, area, addMultipleChoice, updateMultipleChoice, deleteMultipleChoice } = props;
    const iconMultipleAnswer = () => {
        if (area.questionType === "multipleChoices") return "radio_button_checked";
        if (area.questionType === "checkbox") return "check_box";
        if (area.questionType === "dropdown") return "arrow_drop_down_circle";
    };
    return area.questionType === "multipleChoices" || area.questionType === "checkbox" || area.questionType === "dropdown" ? (
        <div className="clear-fix multiple-answer">
            {area.multipleAnswer.map((answer: any, answerIndex: number) => {
                return (
                    <div className="radio-answer" key={answerIndex}>
                        {area.multipleAnswer.length > 1 ? (
                            <div>
                                <div className="delete-area" onClick={e => deleteMultipleChoice(index, answerIndex)}>
                                    <i className="fa fa-times" />
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}
                        <div className="icon-radio clear-fix">
                            <i className="material-icons">{iconMultipleAnswer()}</i>
                        </div>
                        <div className="input-field input-text-radio input-option-create">
                            <TextField
                                name="question_text"
                                hintText=""
                                fullWidth={true}
                                value={area.multipleAnswer[answerIndex]}
                                onChange={(e: any) => updateMultipleChoice(index, answerIndex, e.target.value)}
                            />
                        </div>
                    </div>
                );
            })}

            <div className="radio-answer align-center">
                <RaisedButton label="More option" primary={true} onClick={e => addMultipleChoice(index)} />
            </div>
        </div>
    ) : (
        <div />
    );
};

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
});

const mapDispatchToProps = (dispatch: any) => ({
    addMultipleChoice: (index: number) => dispatch(addMultipleChoice(index)),
    updateMultipleChoice: (index: number, answerIndex: number, answer: string) =>
        dispatch(updateMultipleChoice(index, answerIndex, answer)),
    deleteMultipleChoice: (index: number, answerIndex: number) => dispatch(deleteMultipleChoice(index, answerIndex)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionOptions);
