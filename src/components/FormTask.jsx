import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FormTask = ({ addTasks }) => {
  const [task, setTask] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task?.length) {
      const id = JSON.parse(localStorage.getItem("tasks"))?.slice(-1)[0]?.id || 0;
      const newTask = {
        id: id + 1,
        name: task,
        done: false,
        date: new Date(),
      };
      addTasks(newTask);
      toast.success("Tarea agregada...", {
        position: "top-right",
        theme: "dark",
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="bg-slate-50/75 backdrop-blur p-5 rounded shadow-xl">
      <h2 className="text-3xl font-bold text-center">Agregar tarea</h2>
      <form className="p-5 flex flex-col w-full gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-1 ">
          <div className="flex items-center bg-slate-100 rounded gap-2 shadow border-[1px] border-slate-300">
            <input
              className="bg-inherit flex-1 h-full outline-none p-2 rounded"
              type="text"
              name={task}
              id="task"
              placeholder="Ej. Comprar facturas"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Agregar" className="cursor-pointer p-2 text-center bg-slate-900 font-bold uppercase text-white rounded shadow" />
      </form>
    </div>
  );
};

export default FormTask;
