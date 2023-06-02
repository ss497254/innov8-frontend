import { TabButtons } from "common/src/ui";
import React, { memo } from "react";

interface ProjectsTopBarProps extends React.PropsWithChildren {
  activeTab: string;
  setActiveTab: (x: string) => void;
  tabs: string[];
}

export const ProjectsTopBar: React.FC<ProjectsTopBarProps> = memo(
  ({ activeTab, tabs, setActiveTab }) => {
    return (
      <div>
        <div className="my-4 py-2 f justify-between ic">
          <h3>Projects</h3>
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
