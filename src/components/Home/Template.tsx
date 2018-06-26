import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFormById } from "../redux/actionCreators";

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 220,
    minHeight: 150,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    display: "flex",
    "&:hover": {
      zIndex: 1,
      opacity: 0.75,
      transition: "all .5s ease",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

class Template extends React.Component<
  {
    classes: any;
    linkTo: any;
    meta?: any;
    removeFormById: any;
  },
  {}
> {
  static defaultProps = {
    meta: {
      title: "Sample Survey",
      author: "Daniel",
      description: "Sample description",
      createdDate: new Date().toDateString(),
      completed: false,
    },
  };
  state = {
    isDialogOpen: false,
  };
  toggleDeleteDialog = () =>
    this.setState((pS: any) => ({ isDialogOpen: !pS.isDialogOpen }));
  handleRemoveForm = () => {
    this.props.removeFormById(this.props.meta.id);
    this.setState({ isDialogOpen: false });
  };
  renderDialog = () => {
    const { isDialogOpen } = this.state;
    return (
      <Dialog open={isDialogOpen} onClose={this.toggleDeleteDialog}>
        <DialogTitle>
          Are you sure you want to delete this form?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={this.toggleDeleteDialog}>
            Cancel
          </Button>
          <Button
            variant="raised"
            color="secondary"
            onClick={this.handleRemoveForm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  render() {
    const { classes, linkTo, meta } = this.props;
    const isCreateForm = linkTo === "/survey/create";
    const isPreview = meta.completed;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="assets/img/temp1.png"
            title={meta.title}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {meta.title}
            </Typography>
            <Typography component="p">{meta.description}</Typography>
            <Typography component="p">{meta.createdDate}</Typography>
            {!isCreateForm && (
              <React.Fragment>
                <Typography component="p">
                  {meta.createdDate.substr(0, 10)}
                </Typography>
                <Typography color="secondary">
                  {isPreview ? "Completed" : "Incompleted"}
                </Typography>
              </React.Fragment>
            )}
          </CardContent>
          <CardActions className={classes.actions}>
            <Tooltip
              title={
                isPreview
                  ? "Preview Form"
                  : isCreateForm
                    ? "Create Form"
                    : "Edit Form"
              }
              placement="top"
            >
              <Link to={linkTo}>
                {isPreview ? (
                  <Button size="small" color="secondary">
                    Preview
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color={isCreateForm ? "secondary" : "primary"}
                  >
                    {isCreateForm ? "Create" : "Edit"}
                  </Button>
                )}
              </Link>
            </Tooltip>
            {!isCreateForm && (
              <Tooltip title="Delete" placement="top">
                <IconButton color="secondary" onClick={this.toggleDeleteDialog}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </Card>
        {this.renderDialog()}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = {
  removeFormById,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Template));
