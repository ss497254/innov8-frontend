import React, { useState } from "react";
import { Button, TabButtons } from "common/src/ui";
import { PlusIcon } from "common/src/icons";

interface DashboardTopBarProps extends React.PropsWithChildren {}

let tabs = ["Overview", "List", "Board", "Timeline", "More"];

export const DashboardTopBar: React.FC<DashboardTopBarProps> = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-white px-4 border rounded-lg f justify-between">
      <TabButtons
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Button btn="accent" className="my-2">
        <PlusIcon size={14} className="mr-3" />
        Add new project
      </Button>
    </div>
  );
};
