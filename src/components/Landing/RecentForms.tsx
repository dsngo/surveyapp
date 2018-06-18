import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecentFormsFromDb,
  updateStateStatus,
} from "../redux/actionCreators";
import Template from "./Template";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: 5,
  },
};

class RecentForms extends React.Component<
  {
    classes: any;
    recentForms: any;
    getRecentFormsFromDb: () => any;
    updateStateStatus: (statusKey: string, value: any) => any;
  },
  {}
> {
  componentDidMount() {
    if (this.props.recentForms.length === 0) this.props.getRecentFormsFromDb();
  }
  renderTemplate = () => {
    const {
      classes,
      recentForms,
      getRecentFormsFromDb,
      updateStateStatus,
    } = this.props;
    console.log(recentForms);
    return (
      <Grid container spacing={8} className={classes.root}>
        {recentForms.length === 0 ? (
          <Fade
            in={recentForms.length === 0}
            style={{
              transitionDelay: recentForms.length === 0 ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress size={100} />
          </Fade>
        ) : (
          recentForms.map(form => (
            <Template
              key={form.formId}
              linkTo={`/survey${form.completed ? `/${form.formId}` : ""}`}
              meta={form}
            />
          ))
        )}
      </Grid>
    );
  };
  render() {
    return (
      <div>
        <Typography gutterBottom align="center" variant="display2">
          Your recent forms
        </Typography>
        <div>{this.renderTemplate()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  recentForms: state.recentForms,
});
const mapDispatchToProps = (dispatch: any) => ({
  getRecentFormsFromDb: () => dispatch(getRecentFormsFromDb()),
  updateStateStatus: (statusKey: string, value: any) =>
    dispatch(updateStateStatus(statusKey, value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(RecentForms));
