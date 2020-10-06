import * as React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import AccountProfile from "../../Types/AccountProfile";
import {
  JAPAN_STATES,
  CARD_MONTHS,
  CARD_YEARS,
  CARD_BRANDS,
} from "../../Types/BillingConstants";
import { contentContext, ContentProvider } from "../../Context/ProfileContext";
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
        color: "#dddddd99",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#dddddd99",
      },
      fontSize: 13,
      marginLeft: 20,
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

const countries = ["Japan"];

export interface Props extends WithStyles<typeof styles> {}

function AccountProfileComponent(props: Props) {  
  const [profile, setprofile] = React.useState({
    billingname: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    postalcode: "",
    state: "",
    country: "Japan",
    city: "",
    phonenumber: "",
    cardtype: "",
    cardnumber: "",
    security_code: "",
    exp_month: "",
    exp_year: "",
    profilename: "",
  });

  const {userProfiles, setuserProfiles } =React.useContext(contentContext);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();  
    e.target.name != ""
      ? setprofile((profile) => ({
          ...profile,
          [e.target.name]: e.target.value,
        }))
      : setprofile((profile) => ({
          ...profile,
          [e.target.id]: e.target.value,
        }));  
  };
  const handleCreateProfile = () => {
    setuserProfiles(userProfiles.concat(profile))
    let senddata = {
      model: "profile",
      data: userProfiles,
    };
    ipcRenderer.send("data", senddata);  
  };
  const { classes } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <div className="container">
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="billingname"
              label="BillingName"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.billingname}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.email}
              onChange={handleChangeProfile}
              margin="normal"
            />

            <TextField
              id="address1"
              label="Address"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.address1}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="address2"
              label="Address2"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.address2}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="address3"
              label="Address3"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.address3}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="postalcode"
              label="PostalCode"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.postalcode}
              onChange={handleChangeProfile}
              margin="normal"
            />

            <TextField
              id="country"
              name="country"
              select
              label="Country"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.country}
              onChange={handleChangeProfile}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {countries.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </TextField>

            <TextField
              id="state"
              name="state"
              select
              label="State"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.state}
              onChange={handleChangeProfile}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {JAPAN_STATES.map((option) => (
                <MenuItem value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>

            <TextField
              id="city"
              label="City"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.city}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="phonenumber"
              label="PhoneNumber"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.phonenumber}
              onChange={handleChangeProfile}
              margin="normal"
            />
          </form>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className="container">
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="cardtype"
              name="cardtype"
              select
              label="Card Brand"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.cardtype}
              onChange={handleChangeProfile}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              style={{marginRight:100}}
            >
              {CARD_BRANDS.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>

            <TextField
              id="cardnumber"
              label="Card Number"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.cardnumber}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="security_code"
              label="Security Code"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.textField}
              value={profile.security_code}
              onChange={handleChangeProfile}
              margin="normal"
            />
            <TextField
              id="exp_month"
              name="exp_month"
              select
              label="Expire Month"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              onChange={handleChangeProfile}
              value={profile.exp_month}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {CARD_MONTHS.map((option) => (
                <MenuItem value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="exp_year"
              name="exp_year"
              select
              label="Expire Year"
              className={classes.textField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              value={profile.exp_year}
              onChange={handleChangeProfile}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {CARD_YEARS.map((option) => (
                <MenuItem value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="profilename"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.input }}
              className={classes.textField}
              label="Profile Name"
              onChange={handleChangeProfile}
              margin="normal"
              value={profile.profilename}
            />
            <div>
              <ColorButton variant="outlined" onClick={handleCreateProfile}>
                Create Profile
              </ColorButton>
              <ColorButton variant="outlined">Delete Profile</ColorButton>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(AccountProfileComponent);
