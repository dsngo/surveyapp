import * as React from "react";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import Settings from "./Settings";
import { changeTypeAnswer, deleteArea, chooseArea, addMultipleChoice, updateMultipleChoice, deleteMultipleChoice, updateDescriptionArea } from "./redux/actionCreators";

;
interface ISurveyForm {
    surveyData: any[];
    currentArea: number;
    chooseArea: (index: number) => any;
    changeTypeAnswer: (index: number, answerType: string) => any;
    addMultipleChoice: (index: number) => any;
    updateMultipleChoice: (index: number, answer_index: number, answer: string) => any;
    deleteMultipleChoice: (index: number, answer_index: number) => any;
    updateDescriptionArea: (index: number, field: string, value: string) => any;
    deleteArea: (index: number) => any;
}
const SurveyForm: React.SFC<ISurveyForm> = props => {
    const { surveyData, changeTypeAnswer, deleteArea, currentArea, chooseArea, addMultipleChoice, updateMultipleChoice, deleteMultipleChoice, updateDescriptionArea } = props;
    let indexQuestion = 0;
    let areaList = surveyData.map((area, index) => {
        let classActive = index === currentArea ? "active-area" : "";
        if (area.type === "question") {
            indexQuestion++;
            classActive += " form-question";
            return (
                <div key={index} className={ classActive } onClick={ e => chooseArea(index) }>
                    {
                        surveyData.length > 1 ? (
                            <div>
                                <div className="delete-area" onClick={ e => deleteArea(index) }><i className="fa fa-times"></i></div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    <div className="group">
                        <input type="text" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>{"Question " + indexQuestion }</label>
                    </div>
                    <div className="mdl-selectfield">
                        <label>Standard Select</label>
                        <select className="browser-default" value={ area.answer_type } onChange={e => changeTypeAnswer(index, e.target.value)}>
                            <option className="option-answer" value="" disabled>Choose answer type</option>
                            <option className="option-answer" value="short_answer">Short answer</option>
                            <option className="option-answer" value="long_answer">Long answer</option>
                            <option className="option-answer" value="checkbox">Checkbox</option>
                            <option className="option-answer"value="multiple_choice">Multiple choice</option>
                        </select>
                    </div>
                    {
                        ((area.answer_type === "multiple_choice") || (area.answer_type === "checkbox")) ? (
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
                                                    {
                                                        area.answer_type === "multiple_choice" ? (
                                                            <i className="material-icons ">radio_button_checked</i>
                                                        ) : (
                                                            <i className="material-icons ">check_box</i>
                                                        )
                                                    }
                                                   
                                                </div>
                                                <div className="input-field input-text-radio">
                                                    <input placeholder="Option" value={ answer } onChange={e => updateMultipleChoice(index, answer_index, e.target.value) } className="validate" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                
                                <div className="radio-answer">
                                    <a className="waves-effect waves-light btn" onClick={ e => addMultipleChoice(index) }>More option</a>
                                </div>
                            </div>
                        ) : (<div></div>)
                    }
                </div>
            )
        }
        if (area.type === "description") {
            classActive += " form-info";
            return (
                <div key={index} className={ classActive } onClick={ e => chooseArea(index) }>
                    {
                        surveyData.length > 1 ? (
                            <div>
                                <div className="delete-area" onClick={ e => deleteArea(index) }><i className="fa fa-times"></i></div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
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
    });
    return (
        <Scrollbars id="scroll-survey-form" style={{ height: "calc(100vh - 65px)", width: "100vw"}} autoHide>
            <div className="row">
                <div className="container survey-form" style={{ paddingTop: "15px" }}>
                    <Settings />
                    <div className="form-create clear-fix">
                        <div className="tabs clear-fix">
                            <div className="questions-tab active-tab">QUESTIONS</div>
                            <div className="responses-tab">RESPONSES</div>
                        </div>
                        <div className="form-content">
                            { areaList }
                        </div>
                    </div>
                </div>
            </div>
        </Scrollbars>
    );
};

const mapStateToProps = (state: any) => ({
    surveyData: state.surveyData,
    currentArea: state.currentArea
});

const mapDispatchToProps = (dispatch: any) => ({
    changeTypeAnswer: (index: number, answerType: string) => dispatch(changeTypeAnswer(index, answerType)),
    deleteArea: (index: number) => dispatch(deleteArea(index)),
    chooseArea: (index: number) => dispatch(chooseArea(index)),
    addMultipleChoice: (index: number) => dispatch(addMultipleChoice(index)),
    updateMultipleChoice: (index: number, answer_index: number, answer: string) => dispatch(updateMultipleChoice(index, answer_index, answer)),
    deleteMultipleChoice: (index: number, answer_index: number) => dispatch(deleteMultipleChoice(index, answer_index)),
    updateDescriptionArea: (index: number, field: string, value: string) => dispatch(updateDescriptionArea(index, field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
