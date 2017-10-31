import * as React from "react";
import { removeQuestion, updateQuestion, updateSurveyInfo } from "../redux/actionCreators";
import { IShortQuestion } from "../../types/customTypes";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";



class SurveyInfo extends React.Component<{
  updateSurveyInfo: (info: any) => any;
  info: any;
}> {
  state = {
    title: "",
    description: "",
    completed: false,
    firstTime: true
  };

  handleChangeTitle = (title: string) =>
    this.setState(prevState => ({
      ...prevState,
      title
    }));

  handleChangeDescription = (description: string) =>
    this.setState(prevState => ({
      ...prevState,
      description
    }));
  renderFromCreate() {
    return (
      <div>
        <div className="padding-25-except-top input-option-create">
          <TextField
            name="surveyTitle"
            hintText="Title"
            fullWidth
            value={this.state.title}
            onChange={(e: any) => this.handleChangeTitle(e.target.value)}
            floatingLabelText="Title"
          />
          <TextField
            name="surveyDescription"
            hintText="Description"
            multiLine
            fullWidth
            value={this.state.description}
            onChange={(e: any) => this.handleChangeDescription(e.target.value)}
            floatingLabelText="Description"
          />
        </div>
      </div>
    );
  }
  render() {
    
    return (
      <div className="question-components">
           {this.renderFromCreate()}
      </div>
    );
  }
  // componentWillMount() {
  //   if (this.state.title === "") {
  //     this.setState( prevState => ({ ...prevState, title: this.props.info.title, description: this.props.info.description}))
  //   }
  // }
  componentDidUpdate() {
    if (this.state.firstTime && this.props.info.title) {
      this.setState(prevState => ({
        ...prevState,
        title: this.props.info.title,
        description: this.props.info.description,
        firstTime: false,
      }), () => {
        
      })
    }
    // return this.props.updateQuestion(this.props.questionIndex, this.state);
    if (this.props.info.title !== this.state.title || this.props.info.description !== this.state.description) {
      this.props.updateSurveyInfo(this.state);
    } 
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateSurveyInfo: (info: any) => dispatch(updateSurveyInfo(info))
});

const mapStateToProps = (state: any) => ({
  info: state.surveyInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(SurveyInfo);
