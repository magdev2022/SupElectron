import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button, FormControlLabel, Checkbox } from "@material-ui/core";
import AddTask from "../Types/AddTask";

const { ipcRenderer } = require("electron");
const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 900,
    },
    textField: {
      width: 250,
      "& label.Mui-focused": {
        color: "#dddddd99",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#dddddd99",
      },
      fontSize: 13,
      marginLeft: 20,
      marginTop:40
    },
    textField_small: {
      width: 150,
      "& label.Mui-focused": {
        color: "#dddddd99",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#dddddd99",
      },
      fontSize: 13,
      marginLeft: 20,
      marginTop:40
    },
    input: {
      color: "#dddddd99",
    },
    dense: {
      marginTop: 15,
    },
    menu: {
      width: 200,
    },
  });

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#dddddd99",
    backgroundColor: "#dddddd00",
    width: 200,
    height: 40,
    borderRadius: "5px",
    marginLeft: 10,
    marginTop: 30,
    border: "solid 1px #dddddd99",
    "&:hover": {
      backgroundColor: "#dddddd23",
    },
  },
}))(Button);

const categoies = [
  "Accessories",
  "Shoes",
  "Bags",
  "Hats",
  "Shorts",
  "Tops/Sweaters",
  "Shirts",
  "Jackets",
  "new",
  "Sweatshirts",
  "Skate",
  "T-Shirts",
  "Pants",
];

export interface Props extends WithStyles<typeof styles> {}

class AccountProfileComponent extends React.Component<Props, AddTask> {
  state: AddTask = {
    id: "",
    keyword: "crew,socks",
    style: "black",
    size: "",
    category: "Accessories",
    isCaptchaByPass: false,
    isUseProxy: false,
    profilename: "",
    proxyname: "",
    refreshtime: 100,
    checkoutdelay: 250,
  };
  handleUseProxy=()=>{
    this.setState({isUseProxy:!this.state.isUseProxy})
  }
  handleChangeKeyword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({keyword:e.target.value})
  }  
  handleChangeStyle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({style:e.target.value})
  }  
  handleChangeSize=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({size:e.target.value})
  }  
  handleChangeCategory = (e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({category:e.target.value})
  }

  handleChangeRefreshDelay=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({refreshtime:Number(e.target.value)})
  }

  
  handleChangeCheckoutDelay=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({checkoutdelay:Number(e.target.value)})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="keyword"
            label="Keyword"
            className={classes.textField}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            value={this.state.keyword}
            onChange = {this.handleChangeKeyword}
            margin="normal"
          />
          <TextField
            id="style"
            label="Style"
            className={classes.textField_small}
            type="style"
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            value={this.state.style}
            onChange={this.handleChangeStyle}
            margin="normal"
          />
          <TextField
            id="size"
            label="Size"
            className={classes.textField_small}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            value={this.state.size}
            onChange={this.handleChangeSize}
            margin="normal"
          />
          <TextField
            id="category"
            select
            label="Category"
            className={classes.textField}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            value={this.state.category}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            onChange={this.handleChangeCategory}
            margin="normal"
          >
            {categoies.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            id="profile_name"
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            className={classes.textField}
            label="Profile Name"
            margin="normal"
          />
          <TextField
            id="refresh_time"
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            className={classes.textField}
            label="Refresh Time"
            value={this.state.refreshtime}
            onChange={this.handleChangeRefreshDelay}
            margin="normal"
          />
          <TextField
            id="checkout_delay"
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}
            className={classes.textField}
            label="Checkout Delay"
            value={this.state.checkoutdelay}
            onChange={this.handleChangeCheckoutDelay}
            margin="normal"
          />
          <FormControlLabel
            value="end"
            style={{margin:40}}
            control={<Checkbox color="primary" />}
            label="CaptchaByPass"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{margin:40}}
            value="end"
            control={<Checkbox color="primary" />}
            label="Use Proxy"
            labelPlacement="end"
            onChange={this.handleUseProxy}
          />
          {this.state.isUseProxy && <TextField
            id="proxygroup"
            select
            label="ProxyGroup"
            className={classes.textField_small}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.input }}            
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"            
          >           
          </TextField> }
        </form>
        <div>
            <ColorButton variant="outlined">Create Task</ColorButton>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(AccountProfileComponent);
