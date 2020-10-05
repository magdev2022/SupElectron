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
import {JAPAN_STATES,CARD_MONTHS,CARD_YEARS} from "../../Types/BillingConstants";
import {contentContext,ContentProvider} from "../../Context/ProfileContext"

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

class AccountProfileComponent extends React.Component<Props, AccountProfile> {
  static contextType = contentContext;
  state: AccountProfile = {
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
  };
  
  handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ billingname: e.target.value });
  };

  handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address1: e.target.value });
  };

  handleChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address2: e.target.value });
  };

  handleChangeAddress3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address3: e.target.value });
  };

  handleChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ postalcode: e.target.value });
  };
  handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ country: e.target.value });
  };
  handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ state: e.target.value });
  };

  handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phonenumber: e.target.value });
  };

  handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ city: e.target.value });
  };

  handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cardnumber: e.target.value });
  };

  handleChangeCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ security_code: e.target.value });
  };

  handleChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ exp_month: e.target.value });
  };

  handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ exp_year: e.target.value });
  };

  handleChangeProfileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ profilename: e.target.value });
  };
  render() {
    const { classes } = this.props;
    const handleCreateProfile = () => {
      console.log(this.state);
      let senddata = {
        model: "profile",
        data: this.state,
      };
      ipcRenderer.send("data", senddata);
    };
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
                value={this.state.billingname}
                onChange={this.handleChangeName}
                margin="normal"
              />
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.email}
                onChange={this.handleChangeEmail}
                margin="normal"
              />

              <TextField
                id="address1"
                label="Address"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.address1}
                onChange={this.handleChangeAddress1}
                margin="normal"
              />
              <TextField
                id="address2"
                label="Address2"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.address2}
                onChange={this.handleChangeAddress2}
                margin="normal"
              />
              <TextField
                id="address3"
                label="Address3"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.address3}
                onChange={this.handleChangeAddress3}
                margin="normal"
              />
              <TextField
                id="postalcode"
                label="PostalCode"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.postalcode}
                onChange={this.handleChangePostalCode}
                margin="normal"
              />

              <TextField
                id="country"
                select
                label="Country"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.country}
                onChange={this.handleChangeCountry}
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
                select
                label="State"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.state}
                onChange={this.handleChangeState}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {JAPAN_STATES.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>

              <TextField
                id="city"
                label="City"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.city}
                onChange={this.handleChangeCity}
                margin="normal"
              />
              <TextField
                id="phonenumber"
                label="PhoneNumber"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.phonenumber}
                onChange={this.handleChangePhone}
                margin="normal"
              />
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="container">
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="cardnumber"
                label="Card Number"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                onChange={this.handleChangeCardNumber}
                margin="normal"
              />
              <TextField
                id="security_number"
                label="Security Code"
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                className={classes.textField}
                onChange={this.handleChangeCVV}
                margin="normal"
              />
              <TextField
                id="expire_month"
                select
                label="Expire Month"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.exp_month}
                onChange={this.handleChangeMonth}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {CARD_MONTHS.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
              <TextField
                id="expire_year"
                select
                label="Expire Year"
                className={classes.textField}
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                value={this.state.exp_year}
                onChange={this.handleChangeYear}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {CARD_YEARS.map((option) => (
                  <MenuItem value={option.label}>{option.value}</MenuItem>
                ))}
              </TextField>
              <TextField
                id="profile_name"
                InputProps={{ className: classes.input }}
                InputLabelProps={{ className: classes.input }}
                className={classes.textField}
                label="Profile Name"
                onChange={this.handleChangeProfileName}
                margin="normal"
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
}

export default withStyles(styles)(AccountProfileComponent);
