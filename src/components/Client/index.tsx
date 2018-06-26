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
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Link } from "react-router-dom";

const API = DBSERVER.url;
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    // flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    margin: "0 10vw",
  },
  surveyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  userInfosContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: "40%",
  },
  buttonContainer: {
    display: "flex",
    margin: 8,
    justifyContent: "flex-end",
  },
  buttonItem: {
    marginRight: 8,
  },
};

interface IClientFormProps {
  classes: any;
  match: any;
  formId?: any;
  location?: any;
}

class ClientForm extends React.Component<IClientFormProps, {}> {
  state = {
    refId: "",
    author: {},
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
    openDialog: "none",
    savingStatus: "",
    _id: "",
  };
  // 5b30ccdf3de24c4e3cc89409
  componentDidMount() {
    // 5b28900a2d5bf41accfd2319
    if (this.state.contents.length > 0) return null;
    if (this.props.location.state) {
      console.log(this.props.location.state)
      this.handleContinueSurvey();
    } else if (this.props.match.params.formId) {
      this.handleInitSurvey();
    }
  }
  handleContinueSurvey = async () => {
    const { state: clientId } = this.props.location;
    const { data, message } = (await axios.get(
      `${API}/survey/client/${clientId}`,
    )).data;
    console.log((data))
    this.setState({ ...data });
  };
  handleInitSurvey = async () => {
    const { formId } = this.props.match.params;
    const {
      data: { title, description, _id, contents, author },
    } = (await axios.get(`${API}/survey/form/${formId}`)).data;
    const processedContents = contents.map(
      e =>
        e.questionType === "priority"
          ? {
              ...e,
              answers: e.options.reduce((a, c, i) => {
                a[`priority${i + 1}`] = c.key;
                return a;
              }, {}),
            }
          : e,
    );
    this.setState({
      title,
      author,
      description,
      contents: processedContents,
      refId: _id,
    });
  };

  handleChangeState = (key, val?) => e =>
    this.setState({ [key]: val || e.target.value });

  onChangeContent = (questionId, key, val) => {
    this.setState((prevS: any) => ({
      ...prevS,
      contents: prevS.contents.map(
        e => (e.questionId === questionId ? { ...e, [key]: val } : e),
      ),
    }));
  };
  handleSaveSurvey = async () => {
    const { _id, savingStatus, openDialog, ...clientSurvey } = this.state;
    const { state: clientId } = this.props.location;
    console.log(clientSurvey)
    this.setState({ savingStatus: "SAVING" });
    try {
      const { data, message } = (await (!clientId
        ? axios.post(`${API}/survey/client`, clientSurvey)
        : axios.put(`${API}/survey/client`, { clientSurvey, clientId }))).data;
      if (!data) throw new Error("No data was found!");
      if (openDialog === "submit") {
        this.setState({ savingStatus: "SUBMITTED" });
      }
      if (openDialog === "save") {
        this.setState({ savingStatus: "SAVED", _id: data._id });
      }
    } catch (e) {
      console.log(e.message);
      this.setState({ savingStatus: "" });
    }
  };

  renderDialog = () => {
    const { openDialog, savingStatus, _id } = this.state;
    console.log(savingStatus);
    return (
      <Dialog
        open={openDialog !== "none"}
        onClose={this.handleChangeState("openDialog", "none")}
      >
        <DialogTitle>
          {`Are you sure you want to ${openDialog} this survey?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openDialog === "submit"
              ? "You will not be able to edit the form when you choose submit this form."
              : "You can edit this form later on."}
          </DialogContentText>
          {savingStatus === "SAVING" && (
            <Fade
              in={savingStatus === "SAVING"}
              style={{
                transitionDelay: savingStatus === "SAVING" ? "500ms" : "0ms",
              }}
              unmountOnExit
            >
              <CircularProgress size={100} />
            </Fade>
          )}
          {savingStatus === "SAVED" ? (
            <React.Fragment>
              <DialogContentText color="primary">
                Please save this reference number for future modification:
              </DialogContentText>
              <Typography color="error">{_id}</Typography>
            </React.Fragment>
          ) : (
            <DialogContentText>Thank you for your support</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleChangeState("openDialog", "none")}
          >
            Cancel
          </Button>
          {["SUBMITTED", "SAVED"].includes(savingStatus) ? (
            <Link to="/">
              <Button
                variant="raised"
                color="primary"
                onClick={this.handleChangeState("openDialog", "none")}
              >
                Finish
              </Button>
            </Link>
          ) : openDialog === "save" ? (
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleSaveSurvey}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleSaveSurvey}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

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
      openDialog,
    } = this.state;
    return (
      <div className={classes.surveyContainer}>
        <Typography variant="display2" align="center">
          {title}
        </Typography>
        <Typography variant="subheading" align="center">
          {description}
        </Typography>
        <div className={classes.userInfosContainer}>
          <TextField
            className={classes.textField}
            helperText="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChangeState("firstName")}
          />
          <TextField
            className={classes.textField}
            helperText="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChangeState("lastName")}
          />
          <TextField
            className={classes.textField}
            helperText="Email"
            placeholder="Email"
            value={email}
            onChange={this.handleChangeState("email")}
          />
          <TextField
            className={classes.textField}
            helperText="Phone"
            placeholder="Phone"
            value={phone}
            onChange={this.handleChangeState("phone")}
          />
          <TextField
            className={classes.textField}
            helperText="Address"
            placeholder="Address"
            value={address}
            onChange={this.handleChangeState("address")}
          />
          <TextField
            select
            className={classes.textField}
            helperText="Gender"
            placeholder="Gender"
            value={gender || "Other"}
            onChange={this.handleChangeState("gender")}
          >
            <MenuItem value="men">Men</MenuItem>
            <MenuItem value="women">Women</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </div>
        {this.renderQuestion()}
        <div />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.buttonItem}
            variant="raised"
            onClick={this.handleChangeState("openDialog", "save")}
          >
            Save
          </Button>
          <Button
            className={classes.buttonItem}
            variant="raised"
            onClick={this.handleChangeState("openDialog", "submit")}
          >
            Submit
          </Button>
        </div>
        {this.renderDialog()}
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    const { title } = this.state;
    console.log(this.state)
    return (
      <Paper className={classes.root}>
        {title.length === 0 ? (
          <Fade
            in={title.length === 0}
            style={{
              transitionDelay: title.length === 0 ? "500ms" : "0ms",
              margin: 16,
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
