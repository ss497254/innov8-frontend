import { PageTopBar } from "common";
import { PlusIcon } from "common/src/icons";
import { Button, TabButtons } from "common/src/ui";
import Link from "next/link";
import React from "react";

interface ProjectsTopBarProps extends React.PropsWithChildren {
  activeTab: string;
  setActiveTab: (x: string) => void;
  tabs: string[];
}

export const ProjectsTopBar: React.FC<ProjectsTopBarProps> = ({
  activeTab,
  tabs,
  setActiveTab,
}) => {
  return (
    <PageTopBar
      heading="Projects"
      rightChildren={
        <Link href="/projects/new-project">
          <Button btn="accent">
            <PlusIcon size={14} className="mr-2" />
            New project
          </Button>
        </Link>
      }
    >
      <TabButtons
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </PageTopBar>
  );
};
