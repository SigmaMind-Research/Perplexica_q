import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./slices/ProjectSlice"; // Import the Project slice

// Create the Redux store
export const store = configureStore({
  reducer: {
    project: ProjectReducer, // Project reducer to manage project-related state
  },
});

// Define and export RootState type based on the store's state shape
export type RootState = ReturnType<typeof store.getState>;

export default store;
