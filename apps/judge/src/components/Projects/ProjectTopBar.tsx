import { TabButtons } from "common/src/ui";
import React, { memo } from "react";

interface ProjectTopBarProps extends React.PropsWithChildren {
  activeTab: string;
  setActiveTab: (x: string) => void;
  tabs: string[];
}

export const ProjectTopBar: React.FC<ProjectTopBarProps> = memo(
  ({ activeTab, tabs, setActiveTab }) => {
    return (
      <div>
        <div className="my-4 py-2 f justify-between ic">
          <h3>Project</h3>
        </div>
        <div className="px-2 border-b border-dark-400">
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
