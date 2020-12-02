import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import BotTask from "../Types/BotTask";
import Profile from "../Types/Profile";
import { contentContext } from "../Context/AppContext";
import { AlertDialog } from "../Components/AlertDialog";
const { ipcRenderer } = require("electron");
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ProxyGroup from "../Types/ProxyGroup";

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
        color: "#ddd",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#eee",
      },
      fontSize: 13,
      marginLeft: 20,
      marginTop: 40,
    },
    textField_small: {
      width: 150,
      "& label.Mui-focused": {
        color: "#eee",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#eee",
      },
      fontSize: 13,
      marginLeft: 20,
      marginTop: 40,
    },
    input: {
      color: "#ddd",
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

function CreateTaskPanel(props: Props) {
  const initTask: BotTask = {
    id: Math.floor(Math.random()*1000).toString(),
    keyword: "",
    style: "",
    size: "",
    category: "",
    profilename: "",
    isCaptchaByPass: false,
    isUseProxy: false,
    proxyname: "",
    refreshtime: 500,
    checkoutdelay: 500,
    status: "IDLE",
    message:"IDLE",
    productID: "",
    styleID: "",
    sizeID: "",
  };

  const [curtask, setcurtask] = React.useState<BotTask>(initTask);
  const [profiles, setprofiles] = React.useState<Profile[]>([]);
  const [init, setinit] = React.useState(true);
  const [groups, setgroups] = React.useState([]);

  const { user } = React.useContext(contentContext);
  const [opendlg, setopendlg] = React.useState(false);
  const [openalert, setOpenAlert] = React.useState(false);

  React.useEffect(() => {
    if (init) {
      let getprofiles = ipcRenderer.sendSync("getprofile");
      let getgroups = ipcRenderer.sendSync("getgroup");
      let gettasks = ipcRenderer.sendSync("gettask");
      setprofiles(getprofiles);
      setgroups(getgroups);
      if (gettasks.length > 0)
      {
        setcurtask(gettasks[gettasks.length - 1]);
      }
      setinit(false);
    }
    ipcRenderer.on("updateprofile", (event: any, arg: any) => {
      setprofiles(arg);
    });
    ipcRenderer.on("updategroup", (event: any, arg: any) => {
      setgroups(arg);
    });
    ipcRenderer.on("updatetask", (event: any, arg: any) => {
      if (arg.length > 0)
      {
        setcurtask(arg[arg.length-1]);  
      }      
    });
  });

  const handleChangeAddTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.target.name != ""
      ? setcurtask((task: BotTask) => ({
          ...task,
          [e.target.name]: e.target.value,
        }))
      : setcurtask((task: BotTask) => ({
          ...task,
          [e.target.id]: e.target.value,
        }));
  };

  const handleSelectProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcurtask((task: BotTask) => ({
      ...task,
      proxyname: e.target.value,
    }));
  };
  const handleCloseAlert = () => {
    setopendlg(false);
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setcurtask((task: BotTask) => ({
      ...task,
      [e.target.id]: Number(e.target.value),
    }));
  };

  const handleUseProxy = () => {
    setcurtask((task: BotTask) => ({ ...task, isUseProxy: !task.isUseProxy }));
  };

  const handleCloseNotify = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleCreateTask = () => {
    if (user == "activated") {  
    if (curtask.profilename != "") {     
        ipcRenderer.send("addtask", curtask);
        setOpenAlert(true);
      } else {
        setopendlg(true);
      }
    }
  };

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
          value={curtask.profilename}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          style={{ marginRight: 400 }}
          onChange={handleChangeAddTask}
          margin="normal"
        >
          {profiles.map((option: Profile) => (
            <MenuItem value={option.profilename}>{option.profilename}</MenuItem>
          ))}
        </TextField>
        <TextField
          id="keyword"
          label="Keyword"
          className={classes.textField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={curtask.keyword}
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
          value={curtask.style}
          onChange={handleChangeAddTask}
          margin="normal"
        />
        <TextField
          id="size"
          label="Size"
          className={classes.textField_small}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          value={curtask.size}
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
          value={curtask.category}
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
          value={curtask.refreshtime}
          onChange={handleChangeTime}
          margin="normal"
        />
        <TextField
          id="checkoutdelay"
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.input }}
          className={classes.textField}
          label="Checkout Delay"
          value={curtask.checkoutdelay}
          onChange={handleChangeTime}
          style={{ marginRight: 200 }}
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
          checked={curtask.isUseProxy}
          onChange={handleUseProxy}
        />
        {curtask.isUseProxy && (
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
            onChange={handleSelectProxy}
            margin="normal"
          >
            {groups.map((ele: ProxyGroup) => (
              <MenuItem value={ele.name}>{ele.name}</MenuItem>
            ))}
          </TextField>
        )}
      </form>
      <div>
        <ColorButton variant="outlined" onClick={handleCreateTask}>
          Create Task
        </ColorButton>
      </div>
      <Dialog
        open={opendlg}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Select the Profile!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openalert}
        autoHideDuration={1200}
        onClose={handleCloseNotify}
        message="Task is Created"
        action={
          <React.Fragment>
            <Button color="primary" size="small" onClick={handleCloseNotify} />
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseNotify}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default withStyles(styles)(CreateTaskPanel);
