import * as React from "react";
import { createContext } from "react";
import AccountProfile from "../Types/AccountProfile";
import AddTask from "../Types/AddTask"
import ProxyGroup from '../Types/ProxyGroup'
import { useState, useCallback } from "react";
import { Update } from "@material-ui/icons";


interface TaskManage{
    userProfiles: AccountProfile[];
    setuserProfiles:Function;
    addTasks: AddTask[];
    setaddTasks:Function;
    addGroup: ProxyGroup[];
    setaddGroup:Function;
    capapis:string[];
    setcapapis:Function;
}


const contentContext = createContext<TaskManage>({
  userProfiles: [],
  setuserProfiles: (update: []) => {},
  addTasks:[],
  setaddTasks:(update:[])=>{},
  addGroup:[],
  setaddGroup:(update:[])=>{},
  capapis:[],
  setcapapis:(update:[])=>{}
});

const ContentProvider = ({ children }: any) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [addTasks, setAddTasks] = useState([]); 
  const [addGroup, setAddGroup] = useState([]);  
  const [capapis, setCapapis]=useState([]);
  const setuserProfiles = useCallback(
    (update: []) => {
        setUserProfiles(update);
    },
    [setUserProfiles]
  );
  const setcapapis=useCallback(
    (update: []) => {
        setCapapis(update);
    },
    [setCapapis]
  );
  const setaddTasks=useCallback(
    (update:[])=>{
        setAddTasks(update);
    },
    [setAddTasks]
  );
  const setaddGroup=useCallback(
    (update:[])=>{
        setAddGroup(update);
    },
    [setAddGroup]
  );
  return (
    <contentContext.Provider
      value={{
        userProfiles,setuserProfiles,addTasks,setaddTasks,addGroup,setaddGroup,capapis,setcapapis
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export { contentContext, ContentProvider };
