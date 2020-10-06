import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { MenuItem, Paper, FormControl } from "@material-ui/core";
import AddTask from "../Types/AddTask";
const { ipcRenderer } = require("electron");
import {
  StartActionButton,
  StopActionButton,
  DeleteActionButton,
  LogActionButton,
  FindProductButton,
} from "../Components/CustomIconButton";
import { Label } from "@material-ui/icons";
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
const payment_methods = [
  {
    value: "Credit",
    label: "Credit",
  },
  {
    value: "COD",
    label: "COD",
  },
];
interface TaskItemProps {
  newtask: AddTask;
}
export const TaskItem: React.FC<TaskItemProps> = ({ newtask: addtask }) => {
  const classes = useStyles();
  const [payment, setpayment] = React.useState("Credit");
  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpayment(e.target.value);
  };
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
                <TextField
                  id="mode_select"
                  fullWidth
                  select
                  className={classes.select}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.input }}
                ></TextField>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <label id="status_label" className={classes.label}>
                  IDLE
                </label>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <StartActionButton />
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
