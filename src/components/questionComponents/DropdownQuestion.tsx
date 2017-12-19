import * as React from "react";
import { connect } from "react-redux";
import { addOption, updateOption, removeOption, updateQuestionDetail, toggleOptionChecker } from "../redux/actionCreators";
import { IDropdown } from "../../types/customTypes";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";

class DropdownQuestion extends React.Component<
  {
    questionData: any;
    isRenderClient?: boolean;
    updateQuestionDetail: (questionId: number, detailKey: string, value: any) => any;
    addOption: (questionId: number, key: string, value: any) => any;
    removeOption: (questionId: number, optionId: number) => any;
    updateOption: (questionId: number, optionId: number, key: string, value: any) => any;
  },
  {}
> {
  // Methods

  getCurrentSelection = () => {};

  // Render Methods
  renderFormClient = () => {
    const { props: { questionData: { questionId, question, answer, description, options }, updateQuestionDetail } } = this;
    return (
      <div className="input-option-create">
        <div className="question-info">
          <div className="question">{question}</div>
          <div className="description">{description}</div>
        </div>
        <div className="padding-25">
          <SelectField
            floatingLabelText="Answer"
            fullWidth={true}
            value={answer}
            onChange={(event: object, key: number, payload: any) => {
              updateQuestionDetail(questionId, "answer", payload);
            }}
            className="mui-select"
          >
            {options.map((option: any, key: any) => (
              <MenuItem key={`DOption-${key}`} value={option.text} primaryText={option.text} />
            ))}
          </SelectField>
        </div>
      </div>
    );
  };
  renderFormCreate = () => {
    const {
      props: {
        questionData: { questionId, question, description, options },
        updateQuestionDetail,
        addOption,
        updateOption,
        removeOption,
      },
    } = this;
    return (
      <div>
        <div className="padding-25-except-top input-option-create">
          <TextField
            name="questionText"
            hintText="Multiple choices question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => updateQuestionDetail(questionId, "question", e.target.value)}
            floatingLabelText="Question"
          />
          <TextField
            name="questionDescription"
            hintText="Extra Description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => updateQuestionDetail(questionId, "description", e.target.value)}
            floatingLabelText="Description"
          />
          <div className="clear-fix multiple-answer">
            {options.map((option: any, optionId: number) => {
              return (
                <div className="radio-answer" key={optionId}>
                  {options.length > 1 && (
                    <div>
                      <div className="delete-area" onClick={() => removeOption(questionId, optionId)}>
                        <i className="fa fa-times" />
                      </div>
                    </div>
                  )}
                  <div className="check-box">
                    <Checkbox
                      checked={option.correct}
                      onCheck={e => {
                        updateOption(questionId, optionId, "correct", !option.correct);
                      }}
                    />
                  </div>
                  <div className="icon-radio clear-fix">
                    <i className="material-icons">arrow_drop_down_circle</i>
                  </div>
                  <div className="input-field input-text-radio">
                    <TextField
                      name="optionText"
                      hintText="Add an answer here."
                      fullWidth
                      value={option.text}
                      onChange={(e: any) => updateOption(questionId, optionId, "text", e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
            <div className="radio-answer align-center">
              <FloatingActionButton mini onClick={e => addOption(questionId, "options", { correct: false, answer: "" })}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="question-component">{this.props.isRenderClient ? this.renderFormClient() : this.renderFormCreate()}</div>
    );
  }
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({
  updateQuestionDetail: (questionId: number, detailKey: string, value: any) =>
    dispatch(updateQuestionDetail(questionId, detailKey, value)),
  addOption: (questionId: number, key: string, value: any) => dispatch(addOption(questionId, key, value)),
  updateOption: (questionId: number, optionId: number, key: string, value: any) =>
    dispatch(updateOption(questionId, optionId, key, value)),
  removeOption: (questionId: number, optionId: number) => dispatch(removeOption(questionId, optionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownQuestion);
