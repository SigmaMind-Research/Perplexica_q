import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleProject, deleteProject, openModal, findProject } from "@/redux/slices/ProjectSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RootState } from "@/redux/store"; // Import RootState from the store

interface Project {
  id: string;
  heading: string;
  title: string; // Renaming project to title to match the state
  description: string;
  completed: boolean;
}

const ProjectItems = () => {
  // Properly typing the state based on RootState
  const { projects = [], filterMode, currentProject } = useSelector(
    (state: RootState) => state.project // Correctly access the project state
  );

  const dispatch = useDispatch();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  let filtered = Array.isArray(projects) ? projects : []; // Ensure filtered is always an array
  if (filterMode === "Active") {
    filtered = projects.filter((item: Project) => !item.completed); // Explicit type for item
  } else if (filterMode === "Completed") {
    filtered = projects.filter((item: Project) => item.completed); // Explicit type for item
  }

  const toggleHeadingVisibility = (heading: string) => {
    setActiveHeading(activeHeading === heading ? null : heading);
  };

  const handleEditHeading = (id: string, heading: string) => {
    dispatch(findProject(id));
    dispatch(openModal());
  };

  return (
    <div className="space-y-2">
      {Array.isArray(filtered) && filtered.length > 0 ? (
        filtered.map((item: Project) => (
          <div key={item.id}>
            <div className="flex justify-between items-center">
              <div
                className="cursor-pointer text-blue-600 font-bold"
                onClick={() => toggleHeadingVisibility(item.heading)}
              >
                {item.heading}
              </div>
              <div className="flex space-x-2">
                <span
                  className="text-custom-blue cursor-pointer"
                  onClick={() => handleEditHeading(item.id, item.heading)}
                >
                  <FaEdit />
                </span>
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => dispatch(deleteProject(item.id))}
                >
                  <MdDelete />
                </span>
                <span
                  className="text-green-600 cursor-pointer"
                  onClick={() => dispatch(toggleProject(item.id))}
                >
                  {item.completed ? "Undo" : "Complete"}
                </span>
              </div>
            </div>
            {activeHeading === item.heading && (
              <div className="space-y-2 ml-4">
                <label
                  htmlFor={item.id}
                  className={`${
                    item.completed ? "line-through font-medium" : "font-bold"
                  } text-custom-blue dark:text-custom-white`}
                >
                  {item.title} {/* Display project title */}
                </label>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description} {/* Display project description */}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default ProjectItems;
