import React from "react";
import "./Project.css";
import { PROJECTS } from "../../util/project";
import { ProjectFile } from "./ProjectFile/ProjectFile";

export const Project = () => {
  return (
    <>
      <h1 className="heading" id="Project" data-aos="fade-up">
        My Projects
      </h1>
      <div className="projects" data-aos="zoom">
        {PROJECTS.map((item) => {
          return (
            <ProjectFile
              key={item.title}
              title={item.title}
              tech={item.tech}
              image={item.image}
              link={item.link}
            />
          );
        })}
      </div>
    </>
  );
};
