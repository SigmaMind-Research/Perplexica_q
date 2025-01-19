
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for a project
interface Project {
  id: string;
  heading: string;
  description: string;
  completed: boolean;
}

// Get the projects from localStorage or initialize with an empty array
const localStorageProjects = localStorage.getItem("projects");
const parsedProjects: Project[] = localStorageProjects
  ? JSON.parse(localStorageProjects)
  : [];

// Function to persist projects to localStorage
const setProjects = (projects: Project[]) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

// Define the initial state with the correct types
const initialState = {
  projects: parsedProjects,
  isOpenModal: false,
  currentProject: {
    id: null as string | null, // Allow id to be null initially
    heading: "",
    description: "",
  },
  filterMode: "All",
};

const ProjectSlice = createSlice({
  name: "Project List",
  initialState,
  reducers: {
    // Add a new project
    addProject: (state, action: PayloadAction<Project>) => {
      const newProject = action.payload;
      state.projects.push(newProject);
      setProjects(state.projects); // Persist changes to localStorage
    },

    // Edit a project's heading or description
    editProject: (state, action: PayloadAction<{ id: string; heading: string; description: string }>) => {
      const { id, heading, description } = action.payload;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        project.heading = heading;
        project.description = description;
        setProjects(state.projects); // Persist changes to localStorage
      }
    },

    // Delete a project by its ID
    deleteProject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.projects = state.projects.filter((item) => item.id !== id);
      setProjects(state.projects); // Persist changes to localStorage
    },

    // Toggle project completion status
    toggleProject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        project.completed = !project.completed;
        setProjects(state.projects); // Persist changes to localStorage
      }
    },

    // Clear all completed projects
    clearCompleted: (state) => {
      state.projects = state.projects.filter((item) => !item.completed);
      setProjects(state.projects); // Persist changes to localStorage
    },

    // Open project modal
    openModal: (state) => {
      state.isOpenModal = true;
    },

    // Close project modal
    closeModal: (state) => {
      state.isOpenModal = false;
    },

    // Find a project by ID and populate currentProject (only heading and description)
    findProject: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const project = state.projects.find((item) => item.id === id);
      if (project) {
        state.currentProject.id = project.id;
        state.currentProject.heading = project.heading;
        state.currentProject.description = project.description;
      }
    },

    // Set a filter mode (All, Active, Completed)
    filter: (state, action: PayloadAction<string>) => {
      state.filterMode = action.payload;
    },
  },
});

export const {
  addProject,
  editProject,
  deleteProject,
  toggleProject,
  clearCompleted,
  openModal,
  closeModal,
  findProject,
  filter,
} = ProjectSlice.actions;

export default ProjectSlice.reducer; 