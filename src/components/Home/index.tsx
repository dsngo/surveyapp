import * as React from "react";
import RecentForms from "./RecentForms";
import Forms from "./Forms";
import { withStyles } from "@material-ui/core/styles"

const styles = {
  root: {
    margin: "0 5vw"
  }
}

const HomePage = ({ classes }) => (
  <div className={classes.root}>
    <Forms />
    <RecentForms />
  </div>
);
export default withStyles(styles)(HomePage);
