
import React, { useState } from "react"; 
import { useDispatch } from "react-redux";
import { addProject } from "@/redux/slices/ProjectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [heading, setHeading] = useState(""); // Project heading
  const [description, setDescription] = useState(""); // Project description
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (heading.trim() === "" || description.trim() === "") return;

    // Dispatch action with 'heading' and 'description'
    dispatch(
      addProject({
        heading,
        description,
        id: Date.now().toString(),
        completed: false,
      })
    );

    // Clear inputs after submission
    setHeading("");
    setDescription("");
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
            placeholder="Add a heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
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