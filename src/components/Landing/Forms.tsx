import * as React from "react";
import { connect } from "react-redux";
import Template from "./Template";
import Typography from "@material-ui/core/Typography";

const Forms: React.SFC = props => (
  <div>
    <Typography gutterBottom variant="display2" align="center">
      Create New Form
    </Typography>

    <Template linkTo="/survey" />
  </div>
);

export default connect()(Forms);
