import * as React from "react";
import TaskItem from "../Components/TaskItem";
import { TitleBar } from "../Components/TitleBar";
import TaskControl from "../Components/TaskControl";
export default function TaskBoard() {
  return (
    <div>
      <TaskControl />
      <TitleBar />
      <TaskItem />
    </div>
  );
}
