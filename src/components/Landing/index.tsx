import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as React from "react";
import { connect } from "react-redux";
import HomePage from "../Home";
import { requestLogin } from "../redux/actionCreators";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { DBSERVER } from "../ultis";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 5vw 5px",
    // justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "50%",
  },
};

class Landing extends React.Component<
  {
    classes: any;
    authentication: any;
    requestLogin: (username, password) => any;
  },
  {}
> {
  state = {
    username: "",
    password: "",
    showPassword: false,
    activeTab: 0,
    clientId: "",
    redirect: "",
  };
  handleLogin = e => {
    if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
      const { username, password } = this.state;
      this.props.requestLogin(username, password);
    }
  };

  handleChange = (key, value?) => (e?) => {
    this.setState({ [key]: value || e.target.value });
  };
  handleChangeTabs = (e, v) => this.setState({ activeTab: v });
  
  handleContinueSurvey = clientId => async () => {
    if (clientId) {
      try {
        const { data, message } = (await axios.get(
          `${DBSERVER.url}/survey/client/${clientId}`,
        )).data;
        if (data) {
          console.log("proc");
          return this.setState({ redirect: data._id });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  // 5b2b590aaf807233dc15d1f4
  renderLogin = () => {
    const { classes, authentication } = this.props;
    const {
      username,
      password,
      showPassword,
      activeTab,
      clientId,
      redirect,
    } = this.state;
    const showLoading = authentication.text === "LOGIN_PENDING";
    return (
      <div className={classes.root}>
        {this.state.redirect && (
          <Redirect
            to={{
              pathname: "/client-survey/render/continue",
              state: this.state.redirect,
            }}
          />
        )}
        <Tabs
          value={activeTab}
          onChange={this.handleChangeTabs}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login Form" />
          <Tab label="Continue Survey Form" />
        </Tabs>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={i => this.handleChange("activeTab", i)()}
        >
          <Paper className={classes.formContainer}>
            <TextField
              className={classes.textField}
              placeholder="Username"
              value={username}
              onChange={this.handleChange("username")}
              onKeyPress={this.handleLogin}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              className={classes.textField}
              placeholder="Password"
              value={password}
              onChange={this.handleChange("password")}
              onKeyPress={this.handleLogin}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleChange("showPassword", !showPassword)}
                      // onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <Button color="primary" onClick={this.handleLogin}>
                Login
              </Button>
            </div>
          </Paper>
          <Paper className={classes.formContainer}>
            <TextField
              className={classes.textField}
              placeholder="Client Id"
              value={clientId}
              onChange={this.handleChange("clientId")}
            />
            <Button
              color="primary"
              onClick={this.handleContinueSurvey(clientId)}
            >
              Continue
            </Button>
          </Paper>
        </SwipeableViews>
        {showLoading && (
            <Fade
              in={showLoading}
              style={{
                transitionDelay: showLoading ? "500ms" : "0ms",
              }}
              unmountOnExit
            >
              <CircularProgress size={100} />
            </Fade>
        )}
      </div>
    );
  };
  render() {
    return this.props.authentication.text === "LOGIN_SUCCESS" &&
      this.props.authentication.user.id ? (
      <HomePage />
    ) : (
      this.renderLogin()
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});
const mapDispathToProps = {
  requestLogin,
};

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(withStyles(styles as any)(Landing));
