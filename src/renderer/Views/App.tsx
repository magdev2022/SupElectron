import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TaskBoard from "./TaskBoard";
import ProxyPanel from "./ProxyPanel";
import SettingsPanel from "./Settings";
import ProfilesPanel from "./ProfilesPanel";
import CreateTaskPanel from "./CreateTaskPanel";
import {
  CloseButton,
  MaxWindowButton,
  MinWindowButton,
} from "../Components/CustomIconButton";
import {
  Dashboard,
  Settings,
  Router,
  People,
  AddToPhotos,
  FilterNone,
} from "@material-ui/icons";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#121223",
    height: 30,
    minHeight: 30,
  },
  tabpanel: {
    background: "#121834",
    height: 38,
    minHeight: 38,
    fontSize: 10,
    textAlign: "center",
    color: "#dddddd",
  },
  tab: {
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
    height: 38,
    minHeight: 38,
    color: "#dddddd",
  },
  button: {
    float: "right",
  },
  icon: {
    display: "inline-block",
    marginBottom: -2,
    marginRight: 3,
    fontSize: 15,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CloseButton />
      <MaxWindowButton />
      <MinWindowButton />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabpanel}
          indicatorColor="primary"
        >
          <Tab
            label={
              <span className={classes.tab}>
                <Dashboard className={classes.icon} /> DashBoard
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <span className={classes.tab}>
                {" "}
                <People className={classes.icon} />
                Profiles
              </span>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <span className={classes.tab}>
                {" "}
                <Router className={classes.icon} />
                Proxy
              </span>
            }
            {...a11yProps(2)}
          />
          <Tab
            label={
              <span className={classes.tab}>
                {" "}
                <AddToPhotos className={classes.icon} />
                Add Task
              </span>
            }
            {...a11yProps(3)}
          />
          <Tab
            label={
              <span className={classes.tab}>
                {" "}
                <Settings className={classes.icon} />
                Setting
              </span>
            }
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TaskBoard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfilesPanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProxyPanel />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CreateTaskPanel />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SettingsPanel />
      </TabPanel>
    </div>
  );
}
