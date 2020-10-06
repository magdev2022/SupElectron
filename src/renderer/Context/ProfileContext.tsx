import * as React from "react";
import { createContext } from "react";
import AccountProfile from "../Types/AccountProfile";
import AddTask from "../Types/AddTask"
import { useState, useCallback } from "react";
import { Update } from "@material-ui/icons";

interface TaskManage{
    userProfiles: AccountProfile[];
    setuserProfiles:Function;
    addTasks: AddTask[];
    setaddTasks:Function;
}

const contentContext = createContext<TaskManage>({
  userProfiles: [],
  setuserProfiles: (update: []) => {},
  addTasks:[],
  setaddTasks:(update:[])=>{}
});

const ContentProvider = ({ children }: any) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [addTasks, setAddTasks] = useState([]);  
  const setuserProfiles = useCallback(
    (update: []) => {
        setUserProfiles(update);
    },
    [setUserProfiles]
  );
  const setaddTasks=useCallback(
    (update:[])=>{
        setAddTasks(update);
    },
    [setAddTasks]
  );
  return (
    <contentContext.Provider
      value={{
        userProfiles,setuserProfiles,addTasks,setaddTasks
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export { contentContext, ContentProvider };
