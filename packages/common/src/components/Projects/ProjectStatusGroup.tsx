import { ThreeDotsIcon } from "common/src/icons";
import { Badge, IconButton } from "common/src/ui";
import React from "react";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

interface ProjectStatusGroupProps extends React.PropsWithChildren {
  name: string;
  projects: any[];
}

export const ProjectStatusGroup: React.FC<ProjectStatusGroupProps> = ({
  name,
  projects,
}) => {
  return (
    <div className="p-6 my-6 space-y-4 bg-white rounded-lg">
      <h4 className="text-2xl f ic">
        {name}
        <Badge type="green" className="mx-2">
          {projects.length}
        </Badge>
        <IconButton className="ml-auto">
          <ThreeDotsIcon />
        </IconButton>
      </h4>
      {projects.map((project, idx) => (
        <ProjectSummaryCard key={idx} {...project} />
      ))}
    </div>
  );
};
