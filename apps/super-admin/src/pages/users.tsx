import { NextPageWithLayout, PageTopBar, TabButtons } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

let tabs = ["Admin", "Coach", "Employee", "Judge"];

const ProjectForm: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Users">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
    </div>
  );
};

ProjectForm.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectForm;
