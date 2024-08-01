import { useState, useEffect, useRef } from "react";
import ErrorModal from "./ErrorModal";

export default function ProjectInsert({
  project,
  onSaveButtonClick,
  onCancelButtonClick,
}) {
  const projectTitle = useRef();
  const projectDescription = useRef();
  const projectDueDate = useRef();
  const modal = useRef();

  const [title, setTitle] = useState(project ? project.title : "");
  const [description, setDescription] = useState(
    project ? project.description : ""
  );
  const [dueDate, setDueDate] = useState(project ? project.dueDate : "");
  const [tasks, setTasks] = useState(project ? project.tasks : []);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setDueDate(project.dueDate);
      setTasks(project.tasks);
    }
  }, [project]);

  const handleSaveClick = () => {
    const title = projectTitle.current.value;
    const description = projectDescription.current.value;
    const dueDate = projectDueDate.current.value;

    // 간단한 유효성 검사: 모든 입력 필드가 비어있지 않은지 확인
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onSaveButtonClick({ title, description, dueDate, tasks });
  };

  return (
    <div className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      <form method="dialog" className="mt-4 text-right">
        <button
          onClick={onCancelButtonClick}
          className="px-4 py-2 text-xs md:text-base rounded-md text-stone-700 bg-white hover:text-stone-600 hover:bg-stone-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-100 hover:bg-stone-600"
        >
          Save
        </button>
      </form>
      <label
        name="Title"
        className="text-sm font-bold uppercase text-stone-500"
      >
        Title
      </label>
      <input
        name="Title"
        type="text"
        ref={projectTitle}
        defaultValue={title}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
      />
      <label
        name="Description"
        className="text-sm font-bold uppercase text-stone-500"
      >
        Description
      </label>
      <input
        name="Description"
        type="text"
        ref={projectDescription}
        defaultValue={description}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
      />
      <label
        name="DueDate"
        className="text-sm font-bold uppercase text-stone-500"
      >
        Due date
      </label>
      <input
        name="DueDate"
        type="date"
        ref={projectDueDate}
        defaultValue={dueDate}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
      />

      <ErrorModal ref={modal} />
    </div>
  );
}
