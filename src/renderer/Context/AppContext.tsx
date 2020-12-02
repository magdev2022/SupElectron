import * as React from "react";
import { createContext } from "react";
import { useState, useCallback } from "react";

interface TaskManage{
    user:string;
    setuser:Function;
    webhook:string;
    setwebhook:Function;
}

const contentContext = createContext<TaskManage>({ 
  webhook:"",
  setwebhook:(update:"")=>{},
  user:"",
  setuser:(update:"")=>{}  
});

const ContentProvider = ({ children }: any) => { 
  const [webhook,setWebhook] = useState("");
  const [user, setUser] = useState("");
    
  const setuser = useCallback(
    (update:"") => {
        setUser(update);
    },
    [setUser]
  );  
  const setwebhook = useCallback(
    (update:"") => {
        setWebhook(update);
    },
    [setWebhook]
  );      
  return (
    <contentContext.Provider
      value={{
        webhook,setwebhook,user,setuser
      }}
    >
      {children}
    </contentContext.Provider>
  );
};

export { contentContext, ContentProvider };