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

const Template = ({
  classes,
  linkTo,
  meta = {
    title: "Sample Survey",
    author: "Daniel",
    description: "Sample description",
    createdDate: new Date().toDateString(),
    completed: false,
  },
}) => (
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
      <Typography component="p">{meta.description}</Typography>
      <Typography component="p">{meta.createdDate}</Typography>
      {linkTo !== "/survey/create" && (
        <React.Fragment>
          <Typography component="p">
            {meta.createdDate.substr(0, 10)}
          </Typography>
          <Typography color="secondary">
            {meta.completed ? "Completed" : "Incompleted"}
          </Typography>
        </React.Fragment>
      )}
    </CardContent>
    <CardActions className={classes.actions}>
      <Link to={linkTo}>
        {!meta.completed ? (
          <Button
            size="small"
            color={linkTo === "/survey/create" ? "secondary" : "primary"}
          >
            {linkTo === "/survey/create" ? "Create" : "Edit"}
          </Button>
        ) : (
          <Button size="small" color="secondary">
            Preview
          </Button>
        )}
      </Link>
    </CardActions>
  </Card>
);

export default withStyles(styles)(Template);
