import { FilterIcon, SortIcon } from "common/src/icons";
import { Button, TabButtons } from "common/src/ui";
import React, { memo } from "react";

interface ProjectsTopBarProps extends React.PropsWithChildren {
  activeTab: string;
  setActiveTab: (x: string) => void;
  tabs: string[];
}

export const ProjectsTopBar: React.FC<ProjectsTopBarProps> = memo(
  ({ activeTab, setActiveTab, tabs }) => {
    return (
      <div>
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
        <div className="border-b border-dark-400">
          <TabButtons
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    );
  }
);
