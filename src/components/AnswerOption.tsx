import * as React from "react";
import { connect } from "react-redux";
import { addMultipleChoice, updateMultipleChoice, deleteMultipleChoice } from "./redux/actionCreators";

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


interface IAnswerOption {
    surveyData: any[];
    area: any;
    index: number;
    addMultipleChoice: (index: number) => any;
    updateMultipleChoice: (index: number, answer_index: number, answer: string) => any;
    deleteMultipleChoice: (index: number, answer_index: number) => any;
}

const AnswerOption: React.SFC<IAnswerOption> = props => {
    const { index, area, addMultipleChoice, updateMultipleChoice, deleteMultipleChoice } = props;
    let icon_multiple_answer = () => {
        if (area.answer_type === "multiple_choice") return "radio_button_checked";
        if (area.answer_type === "checkbox") return "check_box";
        if (area.answer_type === "dropdown") return "arrow_drop_down_circle";
    }
    return (
        ((area.answer_type === "multiple_choice") || (area.answer_type === "checkbox") || (area.answer_type === "dropdown")) ? (
            <div className="clear-fix multiple-answer">
                {
                    area.multiple_answer.map((answer: any, answer_index: number) => {
                        return (
                            <div className="radio-answer" key={ answer_index}>
                                {
                                    area.multiple_answer.length > 1 ? (
                                        <div>
                                            <div className="delete-area" onClick={ e => deleteMultipleChoice(index, answer_index) }><i className="fa fa-times"></i></div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                                <div className="icon-radio clear-fix">
                                    <i className="material-icons">
                                        { icon_multiple_answer() }
                                    </i>
                                </div>
                                <div className="input-field input-text-radio input-option-create">
                                    <TextField 
                                        name="question_text"
                                        hintText="" 
                                        fullWidth={ true } 
                                        value={ area.multiple_answer[answer_index]}
                                        onChange={(e:any) => updateMultipleChoice(index, answer_index, e.target.value) }
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                
                <div className="radio-answer align-center">
                    <RaisedButton label="More option" primary={true} onClick={ e => addMultipleChoice(index) } />
                </div>
            </div>
        ) : (<div></div>)
    )
}

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData
});

const mapDispatchToProps = (dispatch: any) => ({
    addMultipleChoice: (index: number) => dispatch(addMultipleChoice(index)),
    updateMultipleChoice: (index: number, answer_index: number, answer: string) => dispatch(updateMultipleChoice(index, answer_index, answer)),
    deleteMultipleChoice: (index: number, answer_index: number) => dispatch(deleteMultipleChoice(index, answer_index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AnswerOption);