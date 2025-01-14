import React, { useState } from "react"; 
import { useDispatch } from "react-redux";
import { addProject } from "@/redux/slices/ProjectSlice"; // Ensure this is correctly importing the action

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(""); // Renamed 'project' to 'title'
  const [heading, setHeading] = useState(""); // Project title
  const [description, setDescription] = useState(""); // New state for description
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  const handleSubmit = (e: React.FormEvent) => { // Explicitly typed event
    e.preventDefault();

    if (title.trim() === "" || heading.trim() === "") return;

    // Dispatch action with 'heading', 'title', 'description', and other properties
    dispatch(addProject({
      heading,
      title,
      description, // Include description here
      id: Date.now().toString(),
      completed: false
    }));

    // Clear inputs after submission
    setTitle(""); // Clear 'title' state
    setHeading(""); // Clear 'heading' state
    setDescription(""); // Clear 'description' state
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <h1 className="text-black text-4xl font-black italic uppercase drop-shadow-2xl dark:text-custom-white">
          Projects
        </h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="text-blue-600 text-2xl font-bold focus:outline-none"
        >
          +
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="py-5 flex space-x-2">
          <input
            type="text"
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Add a heading (title)"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <input
            type="text"
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Add a new project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-600 rounded duration-200"
          >
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default ProjectForm;
