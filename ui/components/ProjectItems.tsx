
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleProject, deleteProject, openModal, findProject } from "@/redux/slices/ProjectSlice";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { RootState } from "@/redux/store"; // Import RootState from the store

// // Define the Project interface correctly
// interface Project {
//   id: string;
//   heading: string;
//   description: string;
//   completed: boolean;
// }

// const ProjectItems = () => {
//   const { projects = [], filterMode } = useSelector(
//     (state: RootState) => state.project // Correctly access the project state
//   );

//   const dispatch = useDispatch();
//   const [activeHeading, setActiveHeading] = useState<string | null>(null);

//   // Filter the projects based on the filter mode
//   let filtered = Array.isArray(projects) ? projects : [];
//   if (filterMode === "Active") {
//     filtered = projects.filter((item: Project) => !item.completed);
//   } else if (filterMode === "Completed") {
//     filtered = projects.filter((item: Project) => item.completed);
//   }

//   // Toggle the description visibility when a heading is clicked
//   const toggleDescription = (heading: string) => {
//     setActiveHeading(activeHeading === heading ? null : heading);
//   };

//   // Handle editing a project's heading
//   const handleEditHeading = (id: string) => {
//     dispatch(findProject(id));
//     dispatch(openModal());
//   };

//   return (
//     <div className="space-y-2">
//       {Array.isArray(filtered) && filtered.length > 0 ? (
//         filtered.map((item: Project) => (
//           <div key={item.id}>
//             <div className="flex justify-between items-center">
//               <div
//                 className="text-blue-600 font-bold cursor-pointer"
//                 onClick={() => toggleDescription(item.heading)} // Toggle description visibility
//               >
//                 {item.heading}
//               </div>
//               <div className="flex space-x-2">
//                 <span
//                   className="text-custom-blue cursor-pointer"
//                   onClick={() => handleEditHeading(item.id)}
//                 >
//                   <FaEdit />
//                 </span>
//                 <span
//                   className="text-red-600 cursor-pointer"
//                   onClick={() => dispatch(deleteProject(item.id))}
//                 >
//                   <MdDelete />
//                 </span>
                
//               </div>
//             </div>
//             {activeHeading === item.heading && ( // Show description only if heading is active
//               <div className="space-y-2 ml-4">
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {item.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No projects found.</p>
//       )}
//     </div>
//   );
// };

// export default ProjectItems; 




// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { editProject, deleteProject, findProject } from "@/redux/slices/ProjectSlice";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { RootState } from "@/redux/store"; // Import RootState from the store

// // Define the Project interface correctly
// interface Project {
//   id: string;
//   heading: string;
//   description: string;
//   completed: boolean;
// }

// const ProjectItems = () => {
//   const { projects = [], filterMode } = useSelector(
//     (state: RootState) => state.project // Correctly access the project state
//   );

//   const dispatch = useDispatch();
//   const [editingId, setEditingId] = useState<string | null>(null); // Track the currently editing project ID
//   const [editType, setEditType] = useState<"heading" | "description" | null>(null); // Type of edit: heading or description
//   const [editValue, setEditValue] = useState<string>(""); // Local state for the value being edited

//   // Filter the projects based on the filter mode
//   let filtered = Array.isArray(projects) ? projects : [];
//   if (filterMode === "Active") {
//     filtered = projects.filter((item: Project) => !item.completed);
//   } else if (filterMode === "Completed") {
//     filtered = projects.filter((item: Project) => item.completed);
//   }

//   // Handle starting the edit mode
//   const handleEdit = (id: string, type: "heading" | "description", value: string) => {
//     setEditingId(id); // Set the project ID being edited
//     setEditType(type); // Set the type of edit
//     setEditValue(value); // Initialize the value with the current heading/description
//   };

//   // Handle saving the edited value
//   const handleSave = () => {
//     if (!editingId || !editType) return;
  
//     // Find the current project being edited
//     const projectToEdit = projects.find((project) => project.id === editingId);
  
//     if (!projectToEdit) return; // If the project is not found, return early
  
//     dispatch(
//       editProject({
//         id: editingId,
//         heading: editType === "heading" ? editValue : projectToEdit.heading, // Default to the existing heading
//         description: editType === "description" ? editValue : projectToEdit.description, // Default to the existing description
//       })
//     );
  
//     setEditingId(null); // Exit editing mode
//     setEditType(null);
//     setEditValue("");
//   };
  
//   return (
//     <div className="space-y-2">
//       {Array.isArray(filtered) && filtered.length > 0 ? (
//         filtered.map((item: Project) => (
//           <div key={item.id}>
//             <div className="flex justify-between items-center">
//               {/* Heading */}
//               <div className="flex items-center space-x-2">
//                 {editingId === item.id && editType === "heading" ? (
//                   <input
//                     type="text"
//                     value={editValue}
//                     onChange={(e) => setEditValue(e.target.value)}
//                     className="border-b-2 border-blue-600 rounded px-2 py-1 dark:text-white dark:bg-slate-700"
//                   />
//                 ) : (
//                   <div
//                     className="text-blue-600 font-bold cursor-pointer"
//                     onClick={() => {}}
//                   >
//                     {item.heading}
//                   </div>
//                 )}
//                 <span
//                   className="text-custom-blue cursor-pointer"
//                   onClick={() => handleEdit(item.id, "heading", item.heading)}
//                 >
//                   <FaEdit />
//                 </span>
//               </div>

//               {/* Actions */}
//               <div className="flex space-x-2">
//                 <span
//                   className="text-red-600 cursor-pointer"
//                   onClick={() => dispatch(deleteProject(item.id))}
//                 >
//                   <MdDelete />
//                 </span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2 ml-4">
//               {editingId === item.id && editType === "description" ? (
//                 <textarea
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                   className="border-b-2 border-blue-600 rounded px-2 py-1 w-full dark:text-white dark:bg-slate-700"
//                 />
//               ) : (
//                 <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
//               )}
//               <span
//                 className="text-custom-blue cursor-pointer"
//                 onClick={() => handleEdit(item.id, "description", item.description)}
//               >
//                 <FaEdit />
//               </span>
//             </div>

//             {/* Save Button */}
//             {editingId === item.id && (
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 hover:bg-green-400 text-white font-bold py-1 px-3 rounded mt-2"
//               >
//                 Save
//               </button>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No projects found.</p>
//       )}
//     </div>
//   );
// };

// export default ProjectItems;


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProject, deleteProject } from "@/redux/slices/ProjectSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RootState } from "@/redux/store"; // Import RootState from the store

interface Project {
  id: string;
  heading: string;
  description: string;
  completed: boolean;
}

const ProjectItems = () => {
  const { projects = [], filterMode } = useSelector(
    (state: RootState) => state.project // Correctly access the project state
  );

  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState<string | null>(null); // Track the currently editing project ID
  const [editType, setEditType] = useState<"heading" | "description" | null>(null); // Type of edit: heading or description
  const [editValue, setEditValue] = useState<string>(""); // Local state for the value being edited
  const [visibleDescriptions, setVisibleDescriptions] = useState<Set<string>>(new Set()); // Track visible descriptions

  // Filter the projects based on the filter mode
  let filtered = Array.isArray(projects) ? projects : [];
  if (filterMode === "Active") {
    filtered = projects.filter((item: Project) => !item.completed);
  } else if (filterMode === "Completed") {
    filtered = projects.filter((item: Project) => item.completed);
  }

  // Handle toggling the description visibility
  const toggleDescription = (id: string) => {
    setVisibleDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id); // Hide description if already visible
      } else {
        newSet.add(id); // Show description if hidden
      }
      return newSet;
    });
  };

  // Handle starting the edit mode
  const handleEdit = (id: string, type: "heading" | "description", value: string) => {
    setEditingId(id); // Set the project ID being edited
    setEditType(type); // Set the type of edit
    setEditValue(value); // Initialize the value with the current heading/description
  };

  // Handle saving the edited value
  const handleSave = () => {
    if (!editingId || !editType) return;

    const projectToEdit = projects.find((project) => project.id === editingId);

    if (!projectToEdit) return;

    dispatch(
      editProject({
        id: editingId,
        heading: editType === "heading" ? editValue : projectToEdit.heading,
        description: editType === "description" ? editValue : projectToEdit.description,
      })
    );

    setEditingId(null);
    setEditType(null);
    setEditValue("");
  };

  // Handle deleting the heading (and entire project)
  const handleDeleteHeading = (id: string) => {
    dispatch(deleteProject(id)); // Delete the entire project
  };

  // Handle deleting only the description
  const handleDeleteDescription = (id: string) => {
    const projectToEdit = projects.find((project) => project.id === id);

    if (!projectToEdit) return;

    dispatch(
      editProject({
        id,
        heading: projectToEdit.heading, // Keep the heading unchanged
        description: "", // Clear the description
      })
    );
  };

  return (
    <div className="space-y-2">
      {Array.isArray(filtered) && filtered.length > 0 ? (
        filtered.map((item: Project) => (
          <div key={item.id}>
            <div className="flex justify-between items-center">
              {/* Heading */}
              <div className="flex items-center space-x-2">
                {editingId === item.id && editType === "heading" ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border-b-2 border-blue-600 rounded px-2 py-1 dark:text-white dark:bg-slate-700"
                  />
                ) : (
                  <div
                    className="text-blue-600 font-bold cursor-pointer"
                    onClick={() => toggleDescription(item.id)} // Toggle description on click
                  >
                    {item.heading}
                  </div>
                )}
                <span
                  className="text-custom-blue cursor-pointer"
                  onClick={() => handleEdit(item.id, "heading", item.heading)}
                >
                  <FaEdit />
                </span>
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteHeading(item.id)}
                >
                  <MdDelete />
                </span>
              </div>
            </div>

            {/* Description */}
            {visibleDescriptions.has(item.id) && ( // Show description if visible
              <div className="space-y-2 ml-4">
                {item.description ? (
                  <>
                    {editingId === item.id && editType === "description" ? (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border-b-2 border-blue-600 rounded px-2 py-1 w-full dark:text-white dark:bg-slate-700"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        {/* Display description text */}
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>

                        {/* Edit icon */}
                        <span
                          className="text-custom-blue cursor-pointer"
                          onClick={() => handleEdit(item.id, "description", item.description)}
                        >
                          <FaEdit />
                        </span>

                        {/* Delete icon */}
                        <span
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDeleteDescription(item.id)}
                        >
                          <MdDelete />
                        </span>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            )}

            {/* Save Button */}
            {editingId === item.id && (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-400 text-white font-bold py-1 px-3 rounded mt-2"
              >
                Save
              </button>
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
