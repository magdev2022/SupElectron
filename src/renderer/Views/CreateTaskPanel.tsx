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
import { contentContext, ContentProvider } from "../Context/ProfileContext";
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
      marginTop: 40,
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
      marginTop: 40,
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

function AccountProfileComponent(props: Props) {
  const [addtask, setaddtask] = React.useState({
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
  });

  const { userProfiles, setuserProfiles,addTasks,setaddTasks,addGroup,setaddGroup } = React.useContext(contentContext);
  const handleChangeAddTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.target.name != ""
      ? setaddtask((addtask) => ({
          ...addtask,
          [e.target.name]: e.target.value,
        }))
      : setaddtask((addtask) => ({
          ...addtask,
          [e.target.id]: e.target.value,
        }));
  };

  const handleChangeTime=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.persist();
    setaddtask((addtask)=>({...addtask,[e.target.id]: Number(e.target.value)}));
  }

  const handleUseProxy = () => {
    setaddtask((addtask) => ({ ...addtask, isUseProxy: !addtask.isUseProxy }));
  };

  const handleCreateTask=()=>{
    setaddTasks(addTasks.concat(addtask));
    let senddata={
      model:"addtask",
      data: addTasks
    }
    ipcRenderer.send("data",senddata);
  }

  const { classes } = props;
  return (
    <div className="container">
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
          id="profilename"
          name="profilename"
          select
          label="Select Profile"
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={addtask.profilename}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          style={{marginRight:400}}
          onChange={handleChangeAddTask}
          margin="normal"
        >
          {userProfiles.map((option) => (
            <MenuItem value={option.profilename}>{option.profilename}</MenuItem>
          ))}
        </TextField>  
        <TextField
          id="keyword"
          label="Keyword"
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={addtask.keyword}
          onChange={handleChangeAddTask}
          margin="normal"
        />
        <TextField
          id="style"
          label="Style"
          className={classes.textField_small}
          type="style"
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={addtask.style}
          onChange={handleChangeAddTask}
          margin="normal"
        />
        <TextField
          id="size"
          label="Size"
          className={classes.textField_small}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={addtask.size}
          onChange={handleChangeAddTask}
          margin="normal"
        />
        <TextField
          id="category"
          name="category"
          select
          label="Category"
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={addtask.category}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          onChange={handleChangeAddTask}
          margin="normal"
        >
          {categoies.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </TextField>   
        <TextField
          id="refreshtime"
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          className={classes.textField}
          label="Refresh Time"
          value={addtask.refreshtime}
          onChange={handleChangeTime}
          margin="normal"
        />
        <TextField
          id="checkoutdelay"
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          className={classes.textField}
          label="Checkout Delay"
          value={addtask.checkoutdelay}
          onChange={handleChangeTime}
          style={{marginRight:200}}
          margin="normal"
        />
        <FormControlLabel
          value="end"
          style={{ margin: 40 }}
          control={<Checkbox color="primary" />}
          label="CaptchaByPass"
          labelPlacement="end"
        />
        <FormControlLabel
          style={{ margin: 40 }}
          value="end"
          control={<Checkbox color="primary" />}
          label="Use Proxy"
          labelPlacement="end"
          onChange={handleUseProxy}
        />
        {addtask.isUseProxy && (
          <TextField
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
            {addGroup.map((ele)=>(<MenuItem value={ele.name}>{ele.name}</MenuItem>))}
          </TextField>
        )}
      </form>
      <div>
        <ColorButton variant="outlined" onClick={handleCreateTask}>Create Task</ColorButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(AccountProfileComponent);
