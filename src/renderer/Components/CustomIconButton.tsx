import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import BotTask from "../Types/BotTask";
import {
  PlayArrow,
  Stop,
  PlayCircleFilledWhite,
  StopRounded,
  Edit,
  FileCopy,
  Delete,
  Visibility,
  AddCircle,
  Search,
  Close,
  FilterNone,
  Minimize,
  Remove,
} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {contentContext} from "../Context/AppContext";
const { ipcRenderer } = require("electron");
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    favstyle: {
      backgroundColor: "#12121200",
      color: "white",
      width: 24,
      height: 24,
      minHeight: 24,
    },
    playstyle: {
      backgroundColor: "#12121200",
      color: "#00dd00",
    },
    startactionbtn: {
      color: "#00dd00",
      padding: 0,
    },
    stopactionbtn: {
      color: "#dd0000",
      padding: 0,
    },
    delactionbtn: {
      color: "#dd0000",
      padding: 0,
    },
    controlbtn: {
      color: "#00dd00",
      padding: 0,
      marginLeft: 4,
      marginRight: 4,
    },
  })
);

interface StartActionProps {
  newtask: BotTask;
}

export const StartActionButton:React.FC<StartActionProps> = ({newtask:addtask}) => {
  const classes = useStyles();
  const handleStartAction = () => {
    ipcRenderer.send("runtask",addtask.id);
  };
  return (
    <Tooltip title="Start" arrow>
      <IconButton
        className={classes.startactionbtn}
        onClick={handleStartAction}
      >
        <PlayArrow />
      </IconButton>
    </Tooltip>
  );
};

export const AddTaskButton = () => {
  const classes = useStyles();
  const handleAddAction = () => {
    console.log("ADD");
  };
  return (
    <Tooltip title="New Task" arrow>
      <IconButton className={classes.startactionbtn} onClick={handleAddAction}>
        <AddCircle />
      </IconButton>
    </Tooltip>
  );
};

export const StopActionButton:React.FC<StartActionProps> = ({newtask:addtask}) => {
  const classes = useStyles();
  const handleStopAction = () => {  
    ipcRenderer.send("stoptask",addtask.id);
  };
  return (
    <Tooltip title="Stop" arrow>
      <IconButton className={classes.stopactionbtn} onClick={handleStopAction}>
        <Stop />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteActionButton:React.FC<StartActionProps> = ({newtask:addtask}) => {
  const classes = useStyles();
  const handleDeleteTask = () => { 
    ipcRenderer.send("removetask", addtask.id);
  };
  return (
    <Tooltip title="Remove" arrow>
      <IconButton className={classes.delactionbtn} onClick={handleDeleteTask}>
        <Delete style={{ width: 20, height: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export const LogActionButton:React.FC<StartActionProps> = ({newtask:addtask}) => {
  const classes = useStyles();
  const handleShowLog = () => {
    ipcRenderer.send("log",addtask.id);
  };
  return (
    <Tooltip title="Show Log" arrow>
      <IconButton className={classes.startactionbtn} onClick={handleShowLog}>
        <Visibility style={{ width: 20, height: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export const AllStartActionButton = () => {
  const classes = useStyles();
  const handleAllStartAction = () => {
    console.log("all start");
  };
  return (
    <Tooltip title="All Start" arrow>
      <IconButton className={classes.controlbtn} onClick={handleAllStartAction}>
        <PlayCircleFilledWhite />
      </IconButton>
    </Tooltip>
  );
};

export const AllStopActionButton = () => {
  const classes = useStyles();
  const handleAllStopAction = () => {
    console.log("all stop");
  };
  return (
    <Tooltip title="All Stop" arrow>
      <IconButton
        className={classes.delactionbtn}
        onClick={handleAllStopAction}
      >
        <Stop style={{ height: 30, width: 30 }} />
      </IconButton>
    </Tooltip>
  );
};

export const EditTaskButton = () => {
  const classes = useStyles();
  const handleEditTask = () => {
    console.log("Edit Task");
  };
  return (
    <Tooltip title="Edit Task" arrow>
      <IconButton className={classes.controlbtn} onClick={handleEditTask}>
        <Edit style={{ height: 25, width: 25 }} />
      </IconButton>
    </Tooltip>
  );
};

export const CopyTaskButton = () => {
  const classes = useStyles();
  const handleCopyTask = () => {
    console.log("Copy Task");
  };
  return (
    <Tooltip title="Copy Task" arrow>
      <IconButton className={classes.controlbtn} onClick={handleCopyTask}>
        <FileCopy style={{ height: 20, width: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export const DeleteTaskButton = () => {
  const classes = useStyles();  
  const handleDeleteTask = () => {
    console.log("delete task");
  };
  return (
    <Tooltip title="Delet Task" arrow>
      <IconButton className={classes.delactionbtn} onClick={handleDeleteTask}>
        <Delete />
      </IconButton>
    </Tooltip>
  );
};

export const FindProductButton = (product_url: string) => {
  const classes = useStyles();
  const handleFindProduct = () => {
    ipcRenderer.send("find_product", product_url);
    ipcRenderer.once("found_product", (_: any, resp: any) => {
      alert(resp.color);
    });
  };
  return (
    <Tooltip title="Find Product" arrow>
      <IconButton className={classes.controlbtn} onClick={handleFindProduct}>
        <Search />
      </IconButton>
    </Tooltip>
  );
};

export const CloseButton = () => {
  const classes = useStyles();
  const handleClose = () => {
    ipcRenderer.send("close-me");
  };
  return (
    <Tooltip title="Close" arrow>
      <IconButton className={classes.delactionbtn} onClick={handleClose}>
        <Close style={{ height: 15, width: 15 }} />
      </IconButton>
    </Tooltip>
  );
};
export const MaxWindowButton = () => {
  const classes = useStyles();
  const handleMaxWindow = () => {
    ipcRenderer.send("max-me");
  };
  return (
    <Tooltip title="Maximize" arrow>
      <IconButton className={classes.controlbtn} onClick={handleMaxWindow}>
        <FilterNone style={{ height: 15, width: 15 }} />
      </IconButton>
    </Tooltip>
  );
};
export const MinWindowButton = () => {
  const classes = useStyles();
  const handleMinWindow = () => {
    ipcRenderer.send("mini-me");
  };
  return (
    <Tooltip title="Minimize" arrow>
      <IconButton className={classes.controlbtn} onClick={handleMinWindow}>
        <Remove style={{ height: 15, width: 15 }} />
      </IconButton>
    </Tooltip>
  );
};
