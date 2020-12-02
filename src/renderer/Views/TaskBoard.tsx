import * as React from "react";
import {TaskItem} from "../Components/TaskItem";
import { TitleBar } from "../Components/TitleBar";
import TaskControl from "../Components/TaskControl";
import { contentContext} from "../Context/AppContext";
import BotTask from "../Types/BotTask";
import { ipcRenderer } from "electron";
export default function TaskBoard() {
  const { user } = React.useContext(contentContext);
  const [tasks, settasks] = React.useState<BotTask[]>([]);
  const [init, setinit] = React.useState(true);
  React.useEffect(() => {
    if (init) {
      let gettasks = ipcRenderer.sendSync("gettask");
      if (gettasks.length > 0) {
        settasks(gettasks);
      }
      setinit(false);
    }
    ipcRenderer.on("updatetask", (event:any, arg:any) => {
      settasks(arg);
    })
  })
  return (
    <div>
      <TaskControl />
      <TitleBar />
      <div>
        {user == "activated" && tasks.length > 0
          ? tasks.map((element) => <TaskItem newtask={element} />)
          : null}
        {/* {tasks.length > 0
          ? tasks.map((element) => (<TaskItem newtask={element} />)):null} */}
      </div>
    </div>
  );
}
