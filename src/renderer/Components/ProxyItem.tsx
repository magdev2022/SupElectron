import * as React from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CustomProxy from "../Types/CustomProxy";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "#00dd00",
    textAlign: "center",
    fontSize: 11,
  },
  paper: {
    textAlign: "center",
    color: "#DDDDDD",
    background: "#343458",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
}));

interface ProxyItemProps {
  newproxy: CustomProxy;  
}

export const ProxyItem: React.FC<ProxyItemProps> = ({
  newproxy: addproxy  
}) => {
    const classes = useStyles(); 
    return (
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <label className={classes.label}>{addproxy.id}</label>
            </Grid>
            <Grid item xs={10}>
              <label className={classes.label}>{addproxy.ip}</label>
            </Grid>           
            </Grid>
        </Paper>
    );
};
