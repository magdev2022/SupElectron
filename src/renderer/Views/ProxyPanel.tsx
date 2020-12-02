import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { ipcRenderer } from "electron";
import CustomProxy from "../Types/CustomProxy";
import ProxyGroup from "../Types/ProxyGroup";
import { ProxyGroupItem } from "../Components/ProxyGroupItem";
import { ProxyItem } from "../Components/ProxyItem";

const useStyles = makeStyles((theme) => ({
  txtProxy: {
    width: 400,
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
  txtGroup: {
    width: 150,
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
  },
  list: {
    backgroundColor: "#121223",
    color: "#eee",
    fontSize: 12,
    height: 230,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    background: "#232345",
    fontSize: 11,
  },
  groupname: {
    fontSize: 13,
    margin: 10,
  },
  textField_small: {
    width: 150,
    "& label.Mui-focused": {
      color: "#dddddd99",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#dddddd99",
    },
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
}));

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: "#DDDDDD",
    backgroundColor: "#ff717100",
    width: 120,
    height: 30,
    borderRadius: "5px",
    border: "solid 1px #DDDDDD",
    fontSize: 11,
    marginLeft: 10,
    "&:hover": {
      backgroundColor: "#ff717112",
    },
  },
}))(Button);
export default function ProxyPanel() {
  const classes = useStyles();

  const [groups, setgroups] = React.useState<ProxyGroup[]>([]);
  const [proxylist, setproxylist] = React.useState<CustomProxy[]>([]);
  const [addproxy, setAddProxy] = React.useState("");
  const [groupname, setgroupname] = React.useState("");
  const [init, setinit] = React.useState(true);
  const [open, setopen] = React.useState(false);

  React.useEffect(() => {
    if (init) {
      let getgroup = ipcRenderer.sendSync("getgroup");
      if (getgroup.length > 0) {
        setgroups(getgroup);
      }
      setinit(false);
    }
    ipcRenderer.on("updategroup", (event: any, arg: any) => {
      setgroups(arg);
    });
  });

  const handleClose = () => setopen(false);
  const handleShow = () => setopen(true);

  const handleChangeAddProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddProxy(e.target.value);
  };

  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(proxylist);
    setgroupname(e.target.value);
  };

  const handleReadProxy = () => {
    setopen(false);
    let proxies = addproxy.split("\n");
    let tempproxies: CustomProxy[] = [];
    proxies.map((ele: string, index) => {
      if (ele.split(":").length == 4) {
        tempproxies.push({
          id: index + 1,
          ip: ele.split(":")[0],
          port: ele.split(":")[1],
          user: ele.split(":")[2],
          pass: ele.split(":")[3],
        });
      } else {
        tempproxies.push({
          id: index + 1,
          ip: ele.split(":")[0],
          port: ele.split(":")[1],
          user: "",
          pass: "",
        });
      }
    });
    setproxylist(tempproxies);
  };

  const handleRemoveProxies = () => {
    setAddProxy("");
    setproxylist([]);
  };

  const handleSaveProxies = () => {
    if (groupname != "" && proxylist.length > 0) {
      var newgroup = {
        name: groupname,
        content: proxylist,
      };
      ipcRenderer.send("addgroup", newgroup);
    }
  };

  const handleRemoveGroup = (name: string) => {
    ipcRenderer.send("removegroup", name);
  };

  // const handleRemoveProxy = (id: number) => {
  //   for (let i = 0; i < proxylist.length; i++) {
  //     if (proxylist[i].id == id) {
  //       proxylist.splice(i, 1);
  //     }
  //   }
  //   setproxylist(proxylist);
  // };

  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={3}>
        <Grid item={true} xs={12} sm={5}>
          <Card className={classes.card}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Paper className={classes.paper}>GROUP NAME</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>PROXY COUNT</Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>ACTION</Paper>
              </Grid>
            </Grid>
            <div style={{ height: 300, overflowY: "auto" }}>
              {groups.map((group: ProxyGroup) => {
                return <ProxyGroupItem newgroup={group} />;
              })}
            </div>
            <ColorButton>Remove ALL</ColorButton>
          </Card>
        </Grid>
        <Grid xs={12} sm={2}></Grid>
        <Grid item={true} xs={12} sm={5}>
          <Card className={classes.card}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Paper className={classes.paper}>ID</Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper className={classes.paper}>PROXY</Paper>
              </Grid>
            </Grid>
            <div style={{ height: 250, overflowY: "auto" }}>
              {proxylist.map((proxy: CustomProxy) => (
                <ProxyItem newproxy={proxy} />
              ))}
            </div>
            <TextField
              value={groupname}
              label="Group Name"
              onChange={handleChangeGroupName}
              className={classes.textField_small}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
            />
            <div>
              <ColorButton onClick={handleShow}>Add Proxy</ColorButton>
              <ColorButton onClick={handleSaveProxies}>Save Group</ColorButton>
              <ColorButton onClick={handleRemoveProxies}>
                Remove All
              </ColorButton>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle id="form-dialog-title">ADD PROXIES</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Add Proxy</DialogContentText>
          <TextField
            autoFocus
            multiline
            margin="dense"
            fullWidth
            value={addproxy}
            onChange={handleChangeAddProxy}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleReadProxy} color="primary">
              Save Proxies
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
