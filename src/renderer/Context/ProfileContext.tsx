import * as React from "react";
import { createContext } from "react";
import AccountProfile from "../Types/AccountProfile";
import { useState, useCallback } from "react";

interface ProfileProps{
    userProfiles: AccountProfile[];
    setuserProfiles:Function;
}

const contentContext = createContext<ProfileProps>({
  userProfiles: [],
  setuserProfiles: (update: []) => {}
});

const ContentProvider = ({ children }: any) => {
  const [userProfiles, setUserProfiles] = useState([]);  
  const setuserProfiles = useCallback(
    (update: []) => {
        setUserProfiles(update);
    },
    [setUserProfiles]
  );
  return (
    <contentContext.Provider
      value={{
        userProfiles,setuserProfiles     
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export { contentContext, ContentProvider };
