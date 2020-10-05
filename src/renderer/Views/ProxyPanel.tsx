import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  WithStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  txtProxy: {
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
  input: {
    color: "#DDDDDD",
  },
}));
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
export default function ProxyPanel() {
  const classes = useStyles();
  const handleAddProxy = () => {
    alert("add proxy");
  };
  return (
    <div>
      <TextField
        multiline
        rows={10}
        id="txtProxy"
        InputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.input }}
        className={classes.txtProxy}
        label="Add Proxy"
        margin="normal"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorButton variant="outlined" onClick={handleAddProxy}>
          ADD PROXY
        </ColorButton>
      </div>
    </div>
  );
}
