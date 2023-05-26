import { Button } from "common";
import { CaretIcon } from "common/src/icons";
import React, { useState } from "react";
import { ProjectDetailCard } from "./ProjectDetailCard";

interface ProjectStatusGroupProps extends React.PropsWithChildren {
  name: string;
  projects: any[];
}

export const ProjectStatusGroup: React.FC<ProjectStatusGroupProps> = ({
  name,
  projects,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 space-y-4">
      <div className="text-lg f ic">
        <Button
          btn="outline"
          className="!rounded-full"
          onClick={() => setOpen(!open)}
        >
          {name}
          <CaretIcon
            size={22}
            className="ml-2"
            style={{ transform: open ? "rotate(180deg)" : "" }}
          />
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {open &&
          projects.map((project, idx) => (
            <ProjectDetailCard key={idx} {...project} />
          ))}
      </div>
    </div>
  );
};
