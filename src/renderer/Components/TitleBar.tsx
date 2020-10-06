import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    textAlign: "center",
    fontSize: 11,
    marginTop: 5,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    background: "#020211",
  },
}));

export const TitleBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>PRODUCT</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>PROFILE</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>PROXY</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>SCHEDULE</Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.paper}>Mode</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>STATUS</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>ACTION</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
