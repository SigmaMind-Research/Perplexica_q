"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "@/redux/slices/ProjectSlice"; // Assuming you have the filter action in ProjectSlice
import { RootState } from "@/redux/store"; // Import the RootState type

const ProjectFilter = () => {
  const dispatch = useDispatch();
  const filterMode = useSelector((state: RootState) => state.project.filterMode); // Explicitly typing the state

  const handleFilterChange = (mode: string) => {
    dispatch(filter(mode));
  };

  return (
    <div className="font-bold text-black sm:space-y-3 text-lg flex flex-row justify-between sm:flex-col dark:text-custom-white">
      {/* Only show the "All" filter */}
      <button
        onClick={() => handleFilterChange("All")}
        className={`${
          filterMode === "All" ? "text-blue-500" : "text-black"
        }`}
      >
       
      </button>
    </div>
  );
};

export default ProjectFilter;
