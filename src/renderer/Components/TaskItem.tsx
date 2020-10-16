import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Paper } from "@material-ui/core";
import AddTask from "../Types/AddTask";
const { ipcRenderer } = require("electron");
import {
  StartActionButton,
  StopActionButton,
  DeleteActionButton,
  LogActionButton,
} from "../Components/CustomIconButton";
const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: "#DDDDDD",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#DDDDDD",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#999999",
    },
  },
  input: {
    color: "#DDDDDD",
    fontSize: 11,
    textAlign: "center",
  },
  select: {
    "&:before": {
      borderColor: "#DDDDDD",
    },
    "&:after": {
      borderColor: "#DDDDDD",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#999999",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#DDDDDD",
    },
  },
  label: {
    color: "#00dd00",
    textAlign: "center",
    fontSize: 11,
  },
  paper: {
    textAlign: "center",
    color: "#DDDDDD",
    background: "#232323",
  },
}));
interface TaskItemProps {
  newtask: AddTask;
}
export const TaskItem: React.FC<TaskItemProps> = ({ newtask: addtask }) => {
  const classes = useStyles();
  return (
    <form
      noValidate
      autoComplete="off"
      style={{ marginTop: 5, marginBottom: 5 }}
    >
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <label id="item" className={classes.label}>
                  {addtask.keyword + "-" + addtask.style + "-" + addtask.size}
                </label>
              </Grid>
              <Grid item xs={3}>
                <label id="item" className={classes.label}>
                  {addtask.profilename}
                </label>
              </Grid>
              <Grid item xs={3}>
                <label id="item" className={classes.label}>
                  {addtask.proxyname}
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <label id="status_label" className={classes.label}>
                  SCHEDULE
                </label>
              </Grid>
              <Grid item xs={3}>
                {/* <TextField
                  id="mode_select"
                  fullWidth
                  select
                  style={{width:100}}
                  className={classes.select}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.input }}
                >
                  {TaskModes.map((mode)=>(<MenuItem value={mode}>{mode}</MenuItem>))}
                </TextField> */}
                <label id="status_label" className={classes.label}>
                  BrowserMode
                </label>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <label id="status_label" className={classes.label}>
                  IDLE
                </label>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <StartActionButton newtask={addtask}/>
                <StopActionButton />
                <DeleteActionButton />
                <LogActionButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
