import { useState, useRef } from "react";
import ErrorModal from "./ErrorModal";

export default function ProjectInfo({
  info,
  onModifyProject,
  onDeleteProject,
  onAddTask,
  onClearTask,
}) {
  const task = useRef();
  const modal = useRef();

  const [checkedTasks, setCheckedTasks] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 5;

  function handleAddTaskClick() {
    if (task.current.value.trim() === "") {
      modal.current.open();
    } else {
      const newTask = task.current.value;
      onAddTask([info.title, newTask]);
      task.current.value = "";
      setCurrentPage(Math.floor(info.tasks.length / tasksPerPage));
    }
  }

  function activeEnter(event) {
    if (event.key === "Enter") {
      handleAddTaskClick();
    }
  }

  function handleCheck(task) {
    setCheckedTasks((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [task]: !prevCheckedTasks[task],
    }));
  }

  const totalPages = Math.ceil(info.tasks.length / tasksPerPage);
  const displayedTasks = info.tasks.slice(
    currentPage * tasksPerPage,
    currentPage * tasksPerPage + tasksPerPage
  );

  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <div className="w-[35rem] mt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">{info.title}</h1>
        <div>
          <button
            className="text-stone-600 hover:text-stone-950 mx-4"
            onClick={() => onModifyProject(info)}
          >
            Modify
          </button>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDeleteProject(info.title)}
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mb-4 text-stone-400">{info.dueDate}</p>
      <p className="text-stone-600 whitespace-pre-wrap">{info.description}</p>
      <header className="pb-4 mb-4 border-b-2 border-stone-300"></header>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="task"
          ref={task}
          onKeyDown={activeEnter}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          className="text-stone-600 hover:text-stone-950"
          onClick={handleAddTaskClick}
        >
          Add task
        </button>
      </div>
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {displayedTasks.map((task, index) => (
          <li key={index} className="flex justify-between">
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={checkedTasks[task] || false}
                onChange={() => handleCheck(task)}
              />
              <p
                className={`text-stone-800 my-4 ${
                  checkedTasks[task] ? "line-through" : ""
                }`}
              >
                {task}
              </p>
            </div>
            <button
              className="text-stone-700 hover:text-red-500"
              onClick={() => onClearTask([info.title, task])}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mx-40">
        <button
          className={`p-3 text-xs ${
            currentPage === 0 ? "text-gray-300" : "text-stone-700"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          ◀
        </button>
        <button
          className={`p-3 text-xs ${
            currentPage === totalPages - 1 ? "text-gray-300" : "text-stone-700"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          ▶
        </button>
      </div>
      <ErrorModal ref={modal} />
    </div>
  );
}
