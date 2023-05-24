import { PlusIcon } from "common/src/icons";
import { Button, TabButtons } from "common/src/ui";
import Link from "next/link";
import React, { memo } from "react";

interface DashboardTopBarProps extends React.PropsWithChildren {
  activeTab: string;
  setActiveTab: (x: string) => void;
  tabs: string[];
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = memo(
  ({ activeTab, tabs, setActiveTab }) => {
    return (
      <div>
        <div className="my-4 md:mx-6 f justify-between ic">
          <h3>Dashboard</h3>
          <Link href="/projects/new-project">
            <Button btn="accent" className="my-2">
              <PlusIcon size={14} className="mr-3" />
              New project
            </Button>
          </Link>
        </div>
        <div className="px-2 md:mx-4 border-b border-dark-400">
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
