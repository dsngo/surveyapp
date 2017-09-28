import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AnswerOption from './AnswerOption';
import { changeTypeAnswer, deleteArea, chooseArea, updateDescriptionArea, updateInfoSurvey, createSurvey, changeQuestion } from "./redux/actionCreators";

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
                            <div className="group">
                                <input type="text" required onChange={e => changeQuestion(index, e.target.value)} />
                                <span className="highlight" />
                                <span className="bar" />
                                <label>{"Question " + indexQuestion }</label>
                            </div>
                            <div className="mui-form">
                                <select className="mui-select" value={ area.answer_type } onChange={e => changeTypeAnswer(index, e.target.value)}>
                                    <option className="option-answer" value="" disabled>Choose answer type</option>
                                    <option className="option-answer" value="short_answer">Short answer</option>
                                    <option className="option-answer" value="long_answer">Long answer</option>
                                    <option className="option-answer" value="checkbox">Checkbox</option>
                                    <option className="option-answer" value="multiple_choice">Multiple choice</option>
                                    <option className="option-answer" value="dropdown">Dropdown</option>
                                </select>
                            </div>
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
