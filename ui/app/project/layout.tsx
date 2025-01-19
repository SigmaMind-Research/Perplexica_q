"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
// import "../styles/globals.css";  // Import your global styles here

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default ProjectLayout;
