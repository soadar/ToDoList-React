import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FormTask from "./components/FormTask";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks?.length) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const loadTask = (task) => {
    setTasks([...tasks, task]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const delTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const doneTask = (taskId) => {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((task) => task.id === taskId);
    newTasks[taskIndex].done = !newTasks[taskIndex].done;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const modTask = (taskId, newName) => {
    if (newName) {
      const newTasks = [...tasks];
      const taskIndex = newTasks.findIndex((task) => task.id === taskId);
      newTasks[taskIndex].name = newName;
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  return (
    <>
      <h1 className="text-6xl font-bold text-center m-12">ToDoList</h1>
      <section className="max-w-[50%] mx-auto">
        <FormTask addTasks={loadTask} />
        <TaskList tareas={tasks} delTask={delTask} doneTask={doneTask} modTask={modTask} />
      </section>
    </>
  );
}

export default App;
