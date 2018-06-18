import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import SubmitIcon from "@material-ui/icons/Beenhere";
import PreviewIcon from "@material-ui/icons/FormatIndentIncrease";
import SaveIcon from "@material-ui/icons/Save";
import * as React from "react";
import { connect } from "react-redux";
import { addQuestion, saveFormToDb } from "./redux/actionCreators";
import Tooltip from "@material-ui/core/Tooltip";
import { createTemplate } from "./ultis";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    position: "fixed",
    top: "15vh",
    right: "5vw",
    width: "48px",
    marginRight: "5px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: "none",
  },
});

const buttons = [
  { icon: AddBoxIcon, tooltip: "Add New Question" },
  { icon: FontDownloadIcon, tooltip: "Reserved" },
  { icon: PreviewIcon, tooltip: "Preview Survey" },
  { icon: SaveIcon, tooltip: "Temporary Save Survey" },
  { icon: SubmitIcon, tooltip: "Finish & Complete Survey" },
];

function renderButton(Icon, label, fn, args) {
  const method = e => (fn ? fn(...args) : e);
  return (
    <Tooltip title={label} placement="left">
      <IconButton onClick={method}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
}

class Settings extends React.Component<
  {
    classes: any;
    addQuestion: (template: any, position?) => any;
    saveFormToDb: (completed: boolean) => any;
  },
  {}
> {
  state = {
    dialogType: "",
  };
  handleState = (k, v = "") => () => this.setState({ [k]: v });

  handleAction = (option?) => () => {
    switch (option) {
      case "submit":
        this.props.saveFormToDb(option === "submit");
        // break;
      case "save":
        this.props.saveFormToDb(option === "submit");
        break;
      default:
        return this.props.addQuestion(createTemplate());
    }
    return this.setState({ dialogType: "" });
  };
  renderDialog = () => {
    const { dialogType } = this.state;
    return (
      <Dialog
        open={["save", "submit"].includes(dialogType)}
        onClose={this.handleState("dialogType")}
      >
        <DialogTitle
        >{`Are you sure you want to ${dialogType} this survey?`}</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={this.handleState("dialogType")}>
            Cancel
          </Button>
          <Button
            variant="raised"
            color="secondary"
            onClick={this.handleAction(dialogType)}
          >
            {dialogType}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <Paper elevation={4} className={classes.root}>
        <MenuList className={classes.column}>
          <Tooltip title="Add New Question" placement="left">
            <IconButton onClick={this.handleAction("add")}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reserved" placement="left">
            <IconButton>
              <FontDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Temporary Save Survey" placement="left">
            <IconButton onClick={this.handleState("dialogType", "save")}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Finish or Complete Survey" placement="left">
            <IconButton onClick={this.handleState("dialogType", "submit")}>
              <SubmitIcon />
            </IconButton>
          </Tooltip>
        </MenuList>
        {this.renderDialog()}
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  addQuestion,
  saveFormToDb,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles as any)(Settings));
