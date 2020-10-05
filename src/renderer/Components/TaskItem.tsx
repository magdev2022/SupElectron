import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { MenuItem, Paper, FormControl } from "@material-ui/core";
const { ipcRenderer } = require("electron");
import {
  StartActionButton,
  StopActionButton,
  DeleteActionButton,
  LogActionButton,
  FindProductButton,
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
export default function TaskControl() {
  const classes = useStyles();
  const [product_url, setProduct_url] = React.useState("");
  const [payment, setpayment] = React.useState("Credit");
  const handleChangeProductURL = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct_url(e.currentTarget.value);
  };
  const handleChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="product_url"
                  className={classes.textField}
                  InputLabelProps={{ className: classes.input }}
                  InputProps={{ className: classes.input }}
                  value={product_url}
                  onChange={handleChangeProductURL}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="style_select"
                  fullWidth
                  select
                  className={classes.select}
                  SelectProps={{ className: classes.input }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="size_select"
                  fullWidth
                  select
                  className={classes.select}
                  SelectProps={{ className: classes.input }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="profile_select"
                  fullWidth
                  select
                  className={classes.select}
                  SelectProps={{ className: classes.input }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <TextField
                  id="payment_select"
                  fullWidth
                  select
                  SelectProps={{ className: classes.input }}
                  onChange={handleChangePayment}
                  value={payment}
                >
                  {payment_methods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="proxy_select"
                  fullWidth
                  select
                  className={classes.select}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.input }}
                />
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <label id="status_label" className={classes.label}>
                  IDLE
                </label>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                {FindProductButton(product_url)}
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
}
