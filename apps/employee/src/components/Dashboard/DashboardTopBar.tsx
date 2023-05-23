import { PlusIcon } from "common/src/icons";
import { Button, Modal, TabButtons } from "common/src/ui";
import React, { useState } from "react";
import { ProjectForm } from "../Froms/ProjectForm";

interface DashboardTopBarProps extends React.PropsWithChildren {}

let tabs = ["Overview", "List", "Board", "Timeline", "More"];

export const DashboardTopBar: React.FC<DashboardTopBarProps> = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <ProjectForm />
      </Modal>
      <div className="my-4 md:mx-6 f justify-between ic">
        <h3>Dashboard</h3>
        <Button
          btn="accent"
          className="my-2"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <PlusIcon size={14} className="mr-3" />
          New project
        </Button>
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
};
