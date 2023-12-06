import TaskItem from "./TaskItem";

const TaskList = ({ tareas, delTask, doneTask, modTask }) => {
  if (tareas?.length) {
    {
      return tareas.map((task) => (
        <TaskItem key={`${task.id}${Math.random()}${Math.random()}`} task={task} delTask={delTask} doneTask={doneTask} modTask={modTask} />
      ));
    }
  }
};

export default TaskList;
