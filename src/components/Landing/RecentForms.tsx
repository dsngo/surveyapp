import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecentForms } from "../redux/actionCreators";
import Template from "./Template";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {
  gridContainter: {
    display: "flex",
    padding: 5,
    justifyContent: "center",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
  },
};

class RecentForms extends React.Component<
  {
    classes: any;
    recentForms: any;
    fetchRecentForms: () => any;
  },
  {}
> {
  componentDidMount() {
    this.props.fetchRecentForms();
  }
  renderTemplate = () => {
    const { classes, recentForms } = this.props;
    return (
      <Grid container spacing={8} className={classes.gridContainter}>
        {recentForms.length === 0 ? (
          <Fade
            in={recentForms.length === 0}
            style={{
              transitionDelay: recentForms.length === 0 ? "500ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress size={100} />
          </Fade>
        ) : (
          recentForms.map(form => (
            <Grid item key={form.id} className={classes.gridItem} md={3} xl={4}>
              <Template
                linkTo={
                  !form.completed
                    ? `/survey/${form.id}`
                    : `/client-survey/render/${form.id}`
                }
                meta={form}
              />
            </Grid>
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
        {this.renderTemplate()}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  recentForms: state.recentForms,
});
const mapDispatchToProps = {
  fetchRecentForms,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(RecentForms));
