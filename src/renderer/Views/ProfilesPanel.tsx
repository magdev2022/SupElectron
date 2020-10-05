import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AccountProfileComponent from "../Components/Profiles/AccountProfile";

export interface ProfileState {
  profile: boolean;
}

class ProfilesPanel extends React.Component<any, ProfileState> {
  render() {
    return (
      <div className="container">
        <AccountProfileComponent />
      </div>
    );
  }
}

export default ProfilesPanel;
