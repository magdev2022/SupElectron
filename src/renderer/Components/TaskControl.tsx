import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Grid, withStyles, Theme, Button } from "@material-ui/core";
import {
  AllStartActionButton,
  AllStopActionButton,
  EditTaskButton,
  CopyTaskButton,
  DeleteTaskButton,
} from "./CustomIconButton";
import {ipcRenderer } from "electron";

const useStyles = makeStyles((theme) => ({
  paper1: {
    padding: 3,
    textAlign: "center",
    background: "#010101",
    width: 200,
    height: 30,
    borderRadius: 10,
  },
  paper2: {
    padding: 3,
    textAlign: "center",
    background: "#010101",
    width: 400,
    height: 30,
    borderRadius: 10,
  },
  text: {
    color: "#00dd00",
    fontSize: 13,
    marginTop: 4,
  },
}));
const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#DDDDDD",
    backgroundColor: "#ff717100",
    width: 150,
    height: 30,
    borderRadius: "5px",
    marginLeft: 30,
    border: "solid 1px #DDDDDD",
    "&:hover": {
      backgroundColor: "#12125532",
    },
    fontSize: 11,
  },
}))(Button);
export default function TaskControl() {
  const classes = useStyles();
  const [tokens, settokens] = React.useState();

  React.useEffect(() => {
    const interval = setInterval(() => {
      let count = ipcRenderer.sendSync("count");
      settokens(count);
    }, 1000);
  });
  
  const handleHarvestCaptcha = () => {
     ipcRenderer.send("harvest");
  };

  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12} sm={6}>
        <Paper className={classes.paper1}>
          <AllStartActionButton />
          <AllStopActionButton />
          <EditTaskButton />
          <CopyTaskButton />
          <DeleteTaskButton />
        </Paper>
      </Grid> */}
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper2}>
          <label className={classes.text}>Valid Captchas: {tokens}</label>
          <ColorButton onClick={handleHarvestCaptcha}>
            Harvest Captcha
          </ColorButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
