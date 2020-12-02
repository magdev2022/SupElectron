import * as React from "react";
import { Paper, Grid, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProxyGroup from "../Types/ProxyGroup";
import { ipcRenderer } from "electron";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "#00dd00",
    textAlign: "center",
    fontSize: 11,
  },
  paper: {
    textAlign: "center",
    color: "#DDDDDD",
    background: "#232323",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  controlbtn: {
    color: "#ff0000",
    padding: 0,
    marginLeft: 4,
    marginRight: 4,
  },
}));
interface GroupItemProps {
  newgroup: ProxyGroup;
}
export const ProxyGroupItem: React.FC<GroupItemProps> = ({
  newgroup: addgroup,
}) => {
  const classes = useStyles();
  const RemoveProxyGroup = () => {
    ipcRenderer.send("removegroup", addgroup.name);
  };
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <label className={classes.label}>{addgroup.name}</label>
        </Grid>
        <Grid item xs={4}>
          <label className={classes.label}>{addgroup.content.length}</label>
        </Grid>
        <Grid item xs={3}>
          <IconButton onClick={RemoveProxyGroup} className={classes.controlbtn}>
            <Delete style={{ height: 15, width: 15 }} />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};
