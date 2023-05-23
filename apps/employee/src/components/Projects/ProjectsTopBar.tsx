import { FilterIcon, SortIcon } from "common/src/icons";
import { Button } from "common/src/ui";
import React from "react";

interface ProjectsTopBarProps extends React.PropsWithChildren {}

export const ProjectsTopBar: React.FC<ProjectsTopBarProps> = () => {
  return (
    <div className="my-4 md:mx-6 f ic space-x-3">
      <h3>Projects</h3>
      <div className="flex-1" />
      <Button btn="outline" className="hover:text-indigo-600">
        <FilterIcon size={18} className="mr-3" /> Filter
      </Button>
      <Button btn="outline" className="hover:text-indigo-600">
        <SortIcon className="mr-3" /> Sort
      </Button>
    </div>
  );
};
