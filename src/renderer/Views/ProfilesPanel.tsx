import * as React from "react";
import AccountProfileComponent from "../Components/Profiles/AccountProfile";

export interface ProfileState {
  profile: boolean;
}

export const ProfilesPanel=()=>{
    return (
      <div className="container">
        <AccountProfileComponent />
      </div>
    );  
}
