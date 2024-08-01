import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import ProjectInfo from "./components/ProjectInfo";
import ProjectInsert from "./components/ProjectInsert";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [isClickedAddButton, setIsClickedAddButton] = useState(false);
  const [allInfo, setAllInfo] = useState([]);
  const [isClickedProject, setIsClickedProject] = useState({});
  const [projectToEdit, setProjectToEdit] = useState(null);

  function handleSelect(title) {
    setIsSelected(true);
    const selectedProject = allInfo.find((project) => project.title === title);
    setIsClickedProject(selectedProject);
  }

  function handleClickedAddButton() {
    setProjectToEdit(null);
    setIsClickedAddButton(true);
  }

  function handleProjectInfo(projectData) {
    if (projectToEdit) {
      setAllInfo((prevAllInfo) =>
        prevAllInfo.map((project) =>
          project.title === projectToEdit.title ? projectData : project
        )
      );
    } else {
      const projectDataWithTasks = {
        ...projectData,
        tasks: [],
      };
      setAllInfo((prevAllInfo) => [...prevAllInfo, projectDataWithTasks]);
    }
    setIsClickedAddButton(false);
    setIsSelected(false);
  }

  function handleClickedCancelButton() {
    setIsClickedAddButton(false);
  }

  function handleAddTask([title, task]) {
    const updatedInfo = allInfo.map((project) => {
      if (project.title === title) {
        return {
          ...project,
          tasks: [...project.tasks, task],
        };
      }
      return project;
    });

    setAllInfo(updatedInfo);

    if (isClickedProject.title === title) {
      setIsClickedProject(
        updatedInfo.find((project) => project.title === title)
      );
    }
  }

  function handleClearTask([title, taskToRemove]) {
    const updatedInfo = allInfo.map((project) => {
      if (project.title === title) {
        return {
          ...project,
          tasks: project.tasks.filter((task) => task !== taskToRemove),
        };
      }
      return project;
    });

    setAllInfo(updatedInfo);

    if (isClickedProject.title === title) {
      setIsClickedProject(
        updatedInfo.find((project) => project.title === title)
      );
    }
  }

  // Project 수정 기능 만들기
  function handleModifyProject(info) {
    setProjectToEdit(info);
    setIsSelected(false);
    setIsClickedAddButton(true);
  }

  function handleDeleteProject(title) {
    setIsSelected(false);
    const updatedInfo = allInfo.filter((project) => project.title !== title);
    setAllInfo(updatedInfo);
  }

  return (
    <main className="h-screen flex gap-8">
      <Sidebar
        onProjectClick={handleSelect}
        onAddButtonClick={handleClickedAddButton}
        allInfo={allInfo}
      />
      {isClickedAddButton ? (
        isClickedAddButton && (
          <ProjectInsert
            project={projectToEdit}
            onSaveButtonClick={handleProjectInfo}
            onCancelButtonClick={handleClickedCancelButton}
          />
        )
      ) : isSelected ? (
        <ProjectInfo
          info={isClickedProject}
          onModifyProject={handleModifyProject}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onClearTask={handleClearTask}
        />
      ) : (
        <MainPage onAddButtonClick={handleClickedAddButton} />
      )}
    </main>
  );
}

export default App;
