import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button, Card, List, ListItem, ListItemText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
const { ipcRenderer } = require("electron");
import { contentContext } from "../Context/ProfileContext";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 600,
    },
    textField: {
      width: 250,
      "& label.Mui-focused": {
        color: "#DDDDDD",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#DDDDDD",
      },
      fontSize: 13,
      marginLeft: 20,
    },
    input: {
      color: "#DDDDDD",
    },
    dense: {
      marginTop: 15,
    },
    menu: {
      width: 200,
    },
    webhook_field: {
      width: 300,
      "& label.Mui-focused": {
        color: "#DDDDDD",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#DDDDDD",
      },
      fontSize: 13,
      marginLeft: 20,
    },
    card: {
      backgroundColor: "#020211",
      padding: 20,
      height: 400,
      marginTop: 50,
    },
    status1: {
      color: "#00dd00",
      marginTop: 20,
    },
    status2: {
      color: "#dd0000",
      marginTop: 20,
    },
    icon: {
      display: "inline-block",
      marginBottom: -2,
      marginRight: 3,
      fontSize: 15,
    },
    list: {
      backgroundColor: "#121223",
      color: "#eee",
      fontSize: 11,
      height: 100,
    },
  });

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#DDDDDD",
    backgroundColor: "#ff717100",
    width: 180,
    height: 30,
    borderRadius: "5px",
    marginLeft: 10,
    marginTop: 30,
    border: "solid 1px #DDDDDD",
    "&:hover": {
      backgroundColor: "#12125532",
    },
    fontSize: 12,
  },
}))(Button);

export interface Props extends WithStyles<typeof styles> {}
export interface State {
  webhook: string;
}
function Setting(props: Props) {
  const [webhook, setwebhook] = React.useState("");
  const { capapis, setcapapis } = React.useContext(contentContext);
  const [capapi, setcapapi] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setwebhook(event.target.value);
  };

  const handleChangeCapAPI = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcapapi(event.target.value);
  };

  const handleAddAPI = () => {
    if (capapi.length > 10) {
      setcapapis(capapis.concat(capapi.split("\n")));
    }
  };

  const handleWebhook = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webhook);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    var testdata = {
      username: "AIOBOTJP",
      content: "Test Webhook",
    };
    xhr.send(JSON.stringify(testdata));
  };

  const { classes } = props;
  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <label style={{ color: "#ddd" }}>AIOBOTJP Login</label>
            <TextField
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              label="Email"
              className={classes.textField}
            />
            <TextField
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              label="Password"
              className={classes.textField}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ColorButton variant="outlined">Activate</ColorButton>
            </div>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <TextField
              multiline
              rows={8}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.webhook_field}
              label="2Captcha API"
              margin="normal"
              value={capapi}
              onChange={handleChangeCapAPI}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <ColorButton variant="outlined" onClick={handleAddAPI}>
                ADD API
              </ColorButton>
              <ColorButton variant="outlined">REMOVE</ColorButton>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className={classes.status1}>
                API Count: {capapis.length}{" "}
              </label>
            </div>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <TextField
              multiline
              rows={8}
              id="webhook"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.webhook_field}
              label="WebHook"
              margin="normal"
              onChange={handleChange}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ColorButton variant="outlined" onClick={handleWebhook}>
                Test WebHook
              </ColorButton>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Setting);
