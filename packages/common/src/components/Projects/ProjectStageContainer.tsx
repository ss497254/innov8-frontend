import { IconButton } from "common";
import { ThreeDotsIcon } from "common/src/icons";
import React from "react";
import { ProjectCard, ProjectCardProps } from "./ProjectCard";

interface ProjectStageContainerProps extends React.PropsWithChildren {
  name: string;
  color: string;
  projects: ProjectCardProps[];
}

export const ProjectStageContainer: React.FC<ProjectStageContainerProps> = ({
  name,
  color,
  projects,
}) => {
  return (
    <div className="flex-1 p-6 bg-white rounded-md space-y-4">
      <h3 className="f ic mb-6">
        <span className={["rounded mr-3 w-4 h-8", color].join(" ")} />
        {name}
        <span className="flex-1" />
        <IconButton className="!p-2">
          <ThreeDotsIcon />
        </IconButton>
      </h3>
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </div>
  );
};
