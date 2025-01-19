"use client";

import { useState, useEffect } from "react";

import ProjectList from "@/components/ProjectList";

const ProjectPage = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Any logic to handle theme changes if required
  }, [theme]);

  return (
    <>
      <ProjectList />
    </>
  );
};

export default ProjectPage;
