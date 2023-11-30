import { useEffect, useState } from "react";

const Task = ({ task, delTask, doneTask, modTask }) => {
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const newNameTask = document.getElementById("newNameInput");
    if (newNameTask) newNameTask.focus();
  }, [edit]);

  const handleDelTask = () => {
    delTask(task.id);
    setNewName("");
  };

  const handleDoneTask = () => {
    doneTask(task.id);
  };

  const handleModTask = () => {
    setEdit(edit ? false : true);
    modTask(task.id, newName);
  };

  return (
    <div className="m-5 flex flex-row w-full gap-3 justify-center">
      <div className="text-center w-80 px-10 mx-5 border-dashed hover:border-solid border-2 border-gray-600 flex items-center ">
        {edit ? (
          <input
            className="bg-inherit px-2"
            placeholder="Ingres nombre nuevo"
            type="text"
            id="newNameInput"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        ) : (
          <span className={`mx-auto ${task.done ? "line-through" : ""}`}>{task.name}</span>
        )}
      </div>
      <button onClick={handleDoneTask} className="bg-emerald-500  rounded-2xl p-2">
        Completar
      </button>

      {edit ? (
        <button className="bg-blue-500  rounded-2xl p-2" id={task.id} onClick={handleModTask}>
          Guardar
        </button>
      ) : (
        <button className="bg-blue-500  rounded-2xl p-2" id={task.id} onClick={handleModTask}>
          Editar
        </button>
      )}

      <button onClick={handleDelTask} className="bg-red-500  rounded-2xl p-2">
        Eliminar
      </button>
    </div>
  );
};

export default Task;
