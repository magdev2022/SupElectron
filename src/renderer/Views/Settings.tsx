import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
const { ipcRenderer } = require("electron");
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
      width: 450,
      "& label.Mui-focused": {
        color: "#DDDDDD",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#DDDDDD",
      },
      fontSize: 13,
      marginLeft: 20,
    },
  });

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#DDDDDD",
    backgroundColor: "#ff717100",
    width: 200,
    height: 40,
    borderRadius: "5px",
    marginLeft: 10,
    marginTop: 30,
    border: "solid 1px #DDDDDD",
    "&:hover": {
      backgroundColor: "#ff717112",
    },
  },
}))(Button);

export interface Props extends WithStyles<typeof styles> {}
export interface State {
  webhook: string;
}
class Setting extends React.Component<Props, State> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ webhook: event.target.value });
  };
  handleWebhook = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.state.webhook);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    var testdata = {
      username: "AIOBOTJP",
      content: "Test Webhook",
    };
    xhr.send(JSON.stringify(testdata));
  };
  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              multiline
              rows={8}
              id="webhook"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.webhook_field}
              label="WebHook"
              margin="normal"
              onChange={this.handleChange}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ColorButton variant="outlined" onClick={this.handleWebhook}>
                Test WebHook
              </ColorButton>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Setting);
