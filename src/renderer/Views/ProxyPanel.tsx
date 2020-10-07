import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  WithStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { Grid, Card, List, ListItem,ListItemText } from "@material-ui/core";

import {contentContext} from '../Context/ProfileContext'

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
  card: {
    backgroundColor: "#020211",
    padding: 20,
    height:400
  },
  list:{
    backgroundColor:"#121223",
    color:"#eee",
    fontSize:12,
    height:250
  }
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
  const {addGroup,setaddGroup} = React.useContext(contentContext);
  const [groupname, setgroupname] = React.useState("");
  const [proxycontent, setproxycontent] = React.useState("");
  const classes = useStyles();

  const handleAddProxy = () => {
    let newgroup = {
      name: groupname,
      content: proxycontent
    }
    setaddGroup(addGroup.concat(newgroup));
  };

  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setgroupname(e.target.value);
  };
  const handleChangeContent =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setproxycontent(e.target.value);
  };
  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={3}>
        <Grid xs={12} sm={5}>
          <Card className={classes.card}>
            <TextField
              multiline
              rows={10}
              id="txtProxy"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.txtProxy}
              label="Add Proxy"
              onChange={handleChangeContent}
              value={proxycontent}
              margin="normal"
            />
            <TextField
              id="txtGroup"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.txtGroup}
              label="GroupName"
              margin="normal"
              value={groupname}
              onChange={handleChangeGroupName}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              <ColorButton variant="outlined" onClick={handleAddProxy}>
                ADD PROXY
              </ColorButton>
            </div>
          </Card>
        </Grid>
        <Grid xs={12} sm={2}></Grid>
        <Grid xs={12} sm={5}>
          <Card className={classes.card}>
            <h4 style={{color:"#fff"}}>Proxy Group List</h4>
            <List component="nav" className={classes.list}>
              {
                addGroup.map((ele)=>(<ListItem button>
                <ListItemText primary={ele.name}/>
              </ListItem>))
              }            
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
