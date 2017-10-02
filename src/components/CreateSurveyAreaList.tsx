import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AnswerOption from './AnswerOption';
import { changeTypeAnswer, deleteArea, chooseArea, updateDescriptionArea, updateInfoSurvey, createSurvey, changeQuestion } from "./redux/actionCreators";

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


interface IAreaList {
    surveyData: any;
    currentArea: number;
    chooseArea: (index: number) => any;
    deleteArea: (index: number) => any;
    changeTypeAnswer: (index: number, answerType: string) => any;
    updateDescriptionArea: (index: number, field: string, value: string) => any;
    changeQuestion: (index: number, value: string) => any;
}


const CreateSurveyAreaList: React.SFC<IAreaList> = props => {
    const { surveyData, currentArea, chooseArea, deleteArea, changeTypeAnswer, updateDescriptionArea, changeQuestion } = props;
    let indexQuestion = 0;
    return (
        <div>
            {
            surveyData.content.map((area: any, index: any) => {
                let classActive = index === currentArea ? "active-area" : "";
                if (area.type === "question") {
                    indexQuestion++;
                    classActive += " form-question";
                    return (
                        <div key={index} className={ classActive } onClick={ e => chooseArea(index) }>
                            <div>
                                <div className="delete-area" onClick={ e => deleteArea(index) }><i className="fa fa-times"></i></div>
                            </div>
                            <TextField 
                                name="question_text"
                                hintText="" 
                                fullWidth={ true } 
                                onChange={ (e:any) => changeQuestion(index, e.target.value)}
                                floatingLabelText={"Question " + indexQuestion }
                            />
                            <SelectField floatingLabelText="Answer" fullWidth={ true } value={ area.answer_type } onChange={ (event: object, key: number, payload: any) => { changeTypeAnswer(index, payload)}} className="mui-select">
                                <MenuItem value="short_answer" label="Short answer">Short answer</MenuItem>
                                <MenuItem value="long_answer" label="Long answer">Long answer</MenuItem>
                                <MenuItem value="checkbox" label="Checkbox">Checkbox</MenuItem>
                                <MenuItem value="multiple_choice" label="Multiple choice">Multiple choice</MenuItem>
                                <MenuItem value="dropdown" label="Dropdown">Dropdown</MenuItem>
                            </SelectField>
                            <AnswerOption area={ area } index={ index } />
                        </div>
                    )
                }
                if (area.type === "description") {
                    classActive += " form-info";
                    return (
                        <div key={index} className={ classActive } onClick={ e => chooseArea(index) }>
                            <div>
                                <div className="delete-area" onClick={ e => deleteArea(index) }><i className="fa fa-times"></i></div>
                            </div>
                            <div className='form-title'>
                                <div className='group'>
                                    <input type='text' required onChange={ e => updateDescriptionArea(index, "title", e.target.value) }/>
                                    <span className='highlight' />
                                    <span className='bar' />
                                    <label>Title</label>
                                </div>
                            </div>
                            <div className='form-description'>
                                <div className='group'>
                                    <input type='text' required onChange={ e => updateDescriptionArea(index, "description", e.target.value) } />
                                    <span className='highlight' />
                                    <span className='bar' />
                                    <label>Description</label>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
        </div>
        
    )
    
};

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
    currentArea: state.currentArea
});

const mapDispatchToProps = (dispatch: any) => ({
    changeTypeAnswer: (index: number, answerType: string) => dispatch(changeTypeAnswer(index, answerType)),
    deleteArea: (index: number) => dispatch(deleteArea(index)),
    chooseArea: (index: number) => dispatch(chooseArea(index)),
    updateDescriptionArea: (index: number, field: string, value: string) => dispatch(updateDescriptionArea(index, field, value)),
    changeQuestion: (index: number, value: string) => dispatch(changeQuestion(index, value))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyAreaList);
