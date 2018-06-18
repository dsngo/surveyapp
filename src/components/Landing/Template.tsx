import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345,
    minWidth: 150,
    minHeight: 185,
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
};

const Template = ({ classes, linkTo, meta = { title: "Sample Survey", author: "Daniel", description: "Sample description" } }) => (
  <ButtonBase className={classes.button}>
    <Link to={linkTo}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="assets/img/temp1.png"
          title={meta.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {meta.author}
          </Typography>
          <Typography component="p">
            {meta.description}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </Link>
  </ButtonBase>
);

export default withStyles(styles)(Template);
