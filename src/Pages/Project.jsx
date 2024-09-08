import React from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const projects = ["project1", "project2", "project3", "project4"];

  const navigate = useNavigate();

  const ViewReport = () => {
    navigate("/reports");
  };

  return (
    <div className="grid grid-cols-3">
      {projects.map((project) => (
        <button onClick={ViewReport} className="border px-4 py-2">
          {project}
        </button>
      ))}
    </div>
  );
};

export default Project;
