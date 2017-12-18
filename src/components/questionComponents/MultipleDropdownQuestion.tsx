import * as React from "react";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import {
  updateQuestionDetail,
  addRow,
  removeRow,
  updateRow,
  addColumn,
  removeColumn,
  updateColumn,
} from "../redux/actionCreators";
import { IMultipleDropdown } from "../../types/customTypes";
import { connect } from "react-redux";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import FloatingActionButton from "material-ui/FloatingActionButton";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

const styles: { [name: string]: React.CSSProperties } = {
  textQuestionColumn: {
    width: "40%",
    textAlign: "center",
  },
  optionAnswerFieldCoumn: {
    textAlign: "center",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  removeColumn: {
    width: "10%",
    textAlight: "center",
  },
};

class MultipleDropdownQuestion extends React.Component<
  {
    questionData: any;
    isRenderClient?: boolean;
    updateQuestionDetail: (questionId: number, detailKey: string, value: any) => any;
    addColumn: (questionId: number, newColumn: any) => any;
    removeColumn: (questionId: number, refId: any) => any;
    updateColumn: (questionId: number, refId: number, columnKey: string, value: any) => any;
    addRow: (questionId: number, newRow: any) => any;
    removeRow: (questionId: number, rowId: number) => any;
    updateRow: (questionId: number, rowId: number, rowKey: string, value: any) => any;
  },
  {}
> {
  // =========================================================
  // state = {
  //   question: "",
  //   description: "",
  //   columns: [
  //     { refId: 1, title: "First Dropdown", tooltip: "Content", options: ["Not Interested", "Interested", "High Interested"] },
  //     { refId: 2, title: "Second Dropdown", tooltip: "Content", options: ["Unimportant", "Important", "Very Important"] },
  //   ],
  //   rows: [{ text: "string", answers: [{refId: 1, text: ""}, {refId: 2, text: ""}] }],
  // };
  // =========================================================
  handleAddRow = (questionId: number, columns: any) => {
    const newRow = {
      text: "",
      answers: columns.map((e: any) => ({refId: e.refId, text: ""})),
    }
    return this.props.addRow(questionId, newRow)
  }
  renderFormClient = () => {};
  renderFormCreate = () => {
    const {
      props: {
        questionData: { questionId, question, columns, rows, description },
        updateQuestionDetail,
        addRow,
        removeRow,
        updateRow,
        addColumn, 
        removeColumn,
        updateColumn,
      },
      handleAddRow,
    } = this;
    return (
      <div>
        <div style={{ padding: "0 24px" }}>
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
        </div>
        <div>
          {rows.map((row: any, index: any) => {
            return (
              <div className="radio-answer" key={index}>
                {rows.length > 1 && (
                  <div>
                    <div className="delete-area" onClick={() => removeRow(questionId, index)}>
                      <i className="fa fa-times" />
                    </div>
                  </div>
                )}
                <div className="icon-radio clear-fix">
                  <i className="material-icons">radio_button_checked</i>
                </div>
                <div className="input-field input-text-radio input-option-create">
                  <TextField
                    name="rowText"
                    hintText="Add a question here."
                    fullWidth
                    value={row.text}
                    onChange={(e: any) => updateRow(questionId, index, "text", e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="radio-answer align-center">
          <FloatingActionButton mini onClick={() => handleAddRow(questionId, columns)}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.props.isRenderClient ? this.renderFormClient() : this.renderFormCreate()}</div>;
  }
}

const mapStateToProps = (state: any) => ({
  questionData: state.
});
const mapDispatchToProps = (dispatch: any) => ({
  updateQuestionDetail: (questionId: number, detailKey: string, value: any) =>
    dispatch(updateQuestionDetail(questionId, detailKey, value)),
  addColumn: (questionId: number, newColumn: any) => dispatch(addColumn(questionId, newColumn)),
  removeColumn: (questionId: number, refId: any) => dispatch(removeColumn(questionId, refId)),
  updateColumn: (questionId: number, refId: number, columnKey: string, value: any) =>
    dispatch(updateColumn(questionId, refId, columnKey, value)),
  addRow: (questionId: number, newRow: any) => dispatch(addRow(questionId, newRow)),
  removeRow: (questionId: number, rowId: number) => dispatch(removeRow(questionId, rowId)),
  updateRow: (questionId: number, rowId: number, rowKey: string, value: any) =>
    dispatch(updateRow(questionId, rowId, rowKey, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleDropdownQuestion);

{/* <div className="dropdown-multi">
<div className="title">{First dropdown}</div>
<TextField
  name="answerText"
  hintText="Description."
  fullWidth
  value={headers[1].text}
  onChange={(e: any) => this.handleUpdateHeader(1, "text", e.target.value)}
/>
{headerQ1Options.map((answer: any, answerIndex: number) => {
  return (
    <div className="radio-answer" key={answerIndex}>
      {headerQ1Options.length > 1 && (
        <div className="pos-relative">
          <div className="delete-area" onClick={() => this.handleRemoveHeaderDropdownOption(1, answerIndex)}>
            <i className="fa fa-times" />
          </div>
        </div>
      )}
      <div className="icon-radio clear-fix">
        <i className="material-icons">arrow_drop_down_circle</i>
      </div>
      <div className="input-field input-text-radio input-option-create">
        <TextField
          name="answerText"
          hintText="Add an answer here."
          fullWidth
          value={answer}
          onChange={(e: any) => this.handleUpdateHeaderDropdownOption(1, answerIndex, e.target.value)}
        />
      </div>
    </div>
  );
})}
<div className="radio-answer align-center">
  <FloatingActionButton mini onClick={e => this.handleAddDropdownOption(1)}>
    <ContentAdd />
  </FloatingActionButton>
</div>
</div>
<div className="dropdown-multi">
<div className="title">Second dropdown</div>
<TextField
  name="answerText"
  hintText="Description."
  fullWidth
  value={headers[2].text}
  onChange={(e: any) => this.handleUpdateHeader(2, "text", e.target.value)}
/>
{headerQ2Options.map((answer: any, answerIndex: number) => {
  return (
    <div className="radio-answer" key={answerIndex}>
      {headerQ2Options.length > 1 && (
        <div className="pos-relative">
          <div className="delete-area" onClick={() => this.handleRemoveHeaderDropdownOption(2, answerIndex)}>
            <i className="fa fa-times" />
          </div>
        </div>
      )}
      <div className="icon-radio clear-fix">
        <i className="material-icons">arrow_drop_down_circle</i>
      </div>
      <div className="input-field input-text-radio input-option-create">
        <TextField
          name="answerText"
          hintText="Add an answer here."
          fullWidth
          value={answer}
          onChange={(e: any) => this.handleUpdateHeaderDropdownOption(2, answerIndex, e.target.value)}
        />
      </div>
    </div>
  );
})}
<div className="radio-answer align-center">
  <FloatingActionButton mini onClick={e => this.handleAddDropdownOption(2)}>
    <ContentAdd />
  </FloatingActionButton>
</div>
</div> */}
