import * as React from "react";
import { connect } from "react-redux";
import Template from "./Template";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles: {[key:string]: React.CSSProperties} = {
  root: {
    marginTop: 5,
    marginBottom: 15,
  },
  formDiv: {
    display: "flex",
    justifyContent: "center"
  },
};

const Forms = ({ classes }) => (
  <div className={classes.root}>
    <Typography gutterBottom variant="display2" align="center">
      Create New Form
    </Typography>

    <div className={classes.formDiv}>
      <Template linkTo="/survey/create" />
    </div>
  </div>
);

export default withStyles(styles as any)(Forms);
