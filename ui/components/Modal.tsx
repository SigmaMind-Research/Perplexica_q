
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, editProject } from "@/redux/slices/ProjectSlice";
import { RootState } from "@/redux/store"; // Update the path based on your project structure
const Modal = () => {
  const dispatch = useDispatch();
      
  // Accessing the current project from Redux state
  const currentProject = useSelector((state: RootState) => state.project.currentProject);

  const { id, heading, description } = currentProject || { id: "", heading: "", description: "" };
  
  // Local state for the input fields
  const [projectHeading, setProjectHeading] = useState(heading || "");
  const [projectDescription, setProjectDescription] = useState(description || "");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectHeading.trim() === "" || projectDescription.trim() === "") return;

    // Dispatch the editProject action with updated values
    dispatch(editProject({ id: id || "", heading: projectHeading, description: projectDescription }));
    dispatch(closeModal());  // Close the modal after saving
  };

  return (
    <div className="flex items-center justify-center bg-blue-700/60 fixed z-50 inset-0 dark:bg-gray-900/80">
      <div className="bg-cyan-200 w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-br-3xl rounded-tl-3xl shadow-2xl p-5 dark:bg-slate-800 dark:shadow-cyan-500 dark:shadow-md">
        <h1 className="text-custom-blue text-4xl font-black italic drop-shadow-2xl text-center dark:text-custom-white">
          Edit Project
        </h1>
        <form onSubmit={handleSubmit} className="py-5 space-y-5 space-x-2">
          <input
            type="text"
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Edit project title"
            value={projectHeading}
            onChange={(e) => setProjectHeading(e.target.value)}
            autoFocus
          />
          <textarea
            className="border-b-4 border-custom-blue rounded-lg px-3 py-2 outline-blue-500 w-full dark:text-custom-white dark:bg-slate-700 dark:border-custom-white"
            placeholder="Edit project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={4}
          />

          <div className="flex justify-around pt-3">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-600 rounded duration-200"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-600 rounded duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;  