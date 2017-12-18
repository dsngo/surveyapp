import * as React from "react";
import { ILongQuestion } from "../../types/customTypes";
import { updateQuestionDetail, addAnswer, updateAnswer, removeAnswer, toggleAnswerChecker } from "../redux/actionCreators";

import { connect } from "react-redux";
import TextField from "material-ui/TextField";

class LongQuestion extends React.Component<
  {
    questionData: any;
    isRenderClient?: boolean;
    updateQuestionDetail: (questionId: number, detailKey: string, value: any) => any;
  },
  {}
> {
  getAnswerString = (textArr: string[]) => textArr.join("\n");
  saveAnswerString = (questionId: number, value: string) => {
    this.props.updateQuestionDetail(questionId, "answers", value.split("\n"));
  };
  renderFormClient() {
    const {
      saveAnswerString,
      props: { questionData: { questionId, question, answers, description }, updateQuestionDetail },
    } = this;
    return (
      <div>
        <div className="question-info">
          <div className="question">{question}</div>
          <div className="description">{description}</div>
        </div>
        <div className="padding-25-except-top">
          <TextField
            name="answerText"
            hintText="Put your answer here"
            multiLine
            fullWidth
            rows={4}
            value={this.getAnswerString(answers)}
            onChange={(e: any) => saveAnswerString(questionId, e.target.value)}
            floatingLabelText="Answer"
          />
        </div>
      </div>
    );
  }
  renderFormCreate = () => {
    const { props: { questionData: { questionId, question, answers, description }, updateQuestionDetail } } = this;
    return (
      <div>
        <div className="input-option-create padding-bottom-25">
          <TextField
            name="questionText"
            hintText="Please type in question"
            multiLine
            fullWidth
            value={question}
            onChange={(e: any) => updateQuestionDetail(questionId, "question", e.target.value)}
            floatingLabelText="Question"
          />
          <TextField
            name="questionDescription"
            hintText="Please type in description"
            multiLine
            fullWidth
            value={description}
            onChange={(e: any) => updateQuestionDetail(questionId, "description", e.target.value)}
            floatingLabelText="Description"
          />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="question-component">{this.props.isRenderClient ? this.renderFormClient : this.renderFormCreate()}</div>
    );
  }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  updateQuestionDetail: (questionId: number, detailKey: string, value: any) =>
    dispatch(updateQuestionDetail(questionId, detailKey, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LongQuestion);
