import { useEffect, useState } from "react";
import { MagicMotion } from "react-magic-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TaskForm from "./components/TaskForm";
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
    if (tasks.length === 1) tasks.shift();
    setTasks(tasks.filter((task) => task.id !== taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    toast.error("Tarea eliminada...", {
      position: "top-right",
      theme: "dark",
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 1000,
    });
  };

  const doneTask = (taskId) => {
    const newTask = [...tasks];
    const taskIndex = newTask.findIndex((task) => task.id === taskId);
    newTask[taskIndex].done = !newTask[taskIndex].done;
    setTasks(newTask);
    if (newTask[taskIndex].done) {
      toast.success("Tarea completada...", {
        position: "top-right",
        theme: "dark",
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  const modTask = (taskId, newName) => {
    if (newName) {
      const newTasks = [...tasks];
      const taskIndex = newTasks.findIndex((task) => task.id === taskId);
      newTasks[taskIndex].name = newName;
      setTasks(newTasks);
      toast.success("Tarea modificada...", {
        position: "top-right",
        theme: "dark",
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  return (
    <MagicMotion>
      <h1 className="text-6xl font-bold text-center m-5">ToDoList</h1>
      <section className="md:max-w-[50%] mx-auto">
        <TaskForm addTasks={loadTask} />
        <TaskList tareas={tasks} delTask={delTask} doneTask={doneTask} modTask={modTask} />
        <ToastContainer />
      </section>
    </MagicMotion>
  );
}

export default App;
