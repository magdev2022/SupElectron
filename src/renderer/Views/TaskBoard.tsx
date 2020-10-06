import * as React from "react";
import {TaskItem} from "../Components/TaskItem";
import { TitleBar } from "../Components/TitleBar";
import TaskControl from "../Components/TaskControl";
import { contentContext} from "../Context/ProfileContext";
export default function TaskBoard() {
  const {addTasks} =React.useContext(contentContext);
  return (
    <div>
      <TaskControl />
      <TitleBar />
      <div>
      {addTasks.length>0?addTasks.map((element)=><TaskItem newtask={element}/>):null}
      </div>
    </div>
  );
}
