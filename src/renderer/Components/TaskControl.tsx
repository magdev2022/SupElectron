import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import {
  AllStartActionButton,
  AllStopActionButton,
  EditTaskButton,
  CopyTaskButton,
  DeleteTaskButton,
} from "./CustomIconButton";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 3,
    textAlign: "center",
    background: "#010101",
    width: 200,
    borderRadius: 20,
  },
}));

export default function TaskControl() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>     
      <AllStartActionButton />
      <AllStopActionButton />
      <EditTaskButton />
      <CopyTaskButton />
      <DeleteTaskButton />
    </Paper>
  );
}
