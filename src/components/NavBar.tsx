import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm, updateStateStatus } from "./redux/actionCreators";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Snackbar from "@material-ui/core/Snackbar";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 5,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const MyLink = props => <Link {...props} to="/" />;

class Navbar extends React.Component<any, {}> {
  state = {
    // auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSnackbar = (k, v) => () => this.props.updateStateStatus(k, v);
  renderSnackBar = () => {
    const { statusText } = this.props;
    return (
      <Snackbar
        key={parseInt(statusText, 10)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(statusText)}
        autoHideDuration={2500}
        onClose={this.handleSnackbar("statusText", "")}
        message={<span id="message-id">{statusText}</span>}
      />
    );
  };
  render() {
    const { classes, brandName } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            {/* <IconButton
              onClick={this.handleSnackbar("statusText", "test snackbar")}
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              component={MyLink}
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {brandName}
            </Typography>
            <div>
              <IconButton onClick={this.handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderSnackBar()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  searchTerm: state.searchTerm,
  brandName: state.brandName,
  surveyData: state.surveyData,
  statusText: state.stateStatus.statusText,
});

const mapDispatchToProps = {
  setSearchTerm,
  updateStateStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Navbar));
