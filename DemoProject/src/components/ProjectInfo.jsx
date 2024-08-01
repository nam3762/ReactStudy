import { useRef } from "react";
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

  function handleAddTaskClick() {
    if (task.current.value.trim() === "") {
      modal.current.open();
    } else {
      const newTask = task.current.value;
      onAddTask([info.title, newTask]);
      task.current.value = "";
    }
  }

  function activeEnter(event) {
    if (event.key === "Enter") {
      handleAddTaskClick();
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

      <p p className="mb-4 text-stone-400">
        {info.dueDate}
      </p>
      <p className="text-stone-600 whitespace-pre-wrap">{info.description}</p>
      <header className="pb-4 mb-4 border-b-2 border-stone-300"></header>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="task"
          ref={task}
          onKeyDown={(event) => activeEnter(event)}
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
        {info.tasks.map((task, index) => (
          <li key={index} className="flex justify-between">
            <div className="flex gap-4">
              <input type="checkbox" />
              <p className="text-stone-800 my-4">{task}</p>
            </div>
            <button
              className="text-stone-700 hover:text-red-500"
              onClick={() => onClearTask([info.title, task])}
            >
              Clear
            </button>
          </li>
        ))}
        <div className="flex justify-between mx-40">
          <li>
            <button className="p-3 text-xs">
              <p className="text-stone-700">◀</p>
            </button>
          </li>
          <li>
            <button className="p-3 text-xs">
              <p className="text-stone-700">▶</p>
            </button>
          </li>
        </div>
      </ul>
      <ErrorModal ref={modal} />
    </div>
  );
}
