import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";
import axios from "axios";
// import QuestionContainer from "./Questions";
// import InfoTab from "./InfoTab";
import {
  updateStateStatus,
  getFormDataById,
  saveFormToDb,
  createNewForm,
} from "../redux/actionCreators";
// import Settings from "./Settings";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import { DBSERVER } from "../ultis";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuestionContainer from "./Questions";

const API = DBSERVER.url;
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    // flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    margin: "0 10vw",
  },
  userInfos: {},
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

interface IClientFormProps {
  classes: any;
  match: any;
  formId: any;
  clientId?: any;
}

class ClientForm extends React.Component<IClientFormProps, {}> {
  state = {
    refId: "",
    title: "",
    description: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    contents: [],
    completed: false,
  };

  componentDidMount() {
    // 5b28900a2d5bf41accfd2319
    if (this.props.clientId) {
    } else if (this.props.match.params.formId) {
      this.handleApiRequest();
    }
  }
  handleApiRequest = async () => {
    const { formId } = this.props.match.params;
    const {
      data: { title, description, _id, contents },
    } = (await axios.get(`${API}/survey/form/${formId}`)).data;
    this.setState({ title, description, contents, refId: _id });
  };

  handleChangeState = (key, val?) => e =>
    this.setState({ [key]: val || e.target.value });

  onChangeContent = (questionId, key, val) =>
    this.setState((prevS: any) => ({
      ...prevS,
      contents: prevS.contents.map(
        e => (e.questionId === questionId ? { ...e, [key]: val } : e),
      ),
    }));

  renderQuestion = () => {
    const { contents } = this.state;
    return contents.map((e: any) => (
      <QuestionContainer
        onChangeContent={this.onChangeContent}
        questionData={e}
        key={`${e.questionId}`}
      />
    ));
  };

  renderSurvey() {
    const { classes } = this.props;
    const {
      title,
      description,
      firstName,
      lastName,
      email,
      phone,
      address,
      gender,
      contents,
    } = this.state;
    console.log(contents);
    return (
      <div>
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
        <div className={classes.userInfos}>
          <TextField
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChangeState("firstName")}
          />
          <TextField
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChangeState("lastName")}
          />
          <TextField
            placeholder="Email"
            value={email}
            onChange={this.handleChangeState("email")}
          />
          <TextField
            placeholder="Phone"
            value={phone}
            onChange={this.handleChangeState("phone")}
          />
          <TextField
            placeholder="Address"
            value={address}
            onChange={this.handleChangeState("address")}
          />
          <TextField
            placeholder="Gender"
            value={gender}
            onChange={this.handleChangeState("gender")}
          />
        </div>
        {this.renderQuestion()}
        <div />
        <div className={classes.button}>
          <Button>Submit</Button>
        </div>
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    const { title } = this.state;
    return (
      <Paper className={classes.root}>
        {title.length === 0 ? (
          <Fade
            in={title.length === 0}
            style={{
              transitionDelay: title.length === 0 ? "500ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress size={100} />
          </Fade>
        ) : (
          this.renderSurvey()
        )}
      </Paper>
    );
  }
}

export default withStyles(styles as any)(ClientForm);
