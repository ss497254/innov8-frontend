import { NextPageWithLayout, PageTopBar, TabButtons } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { EditForm, ViewForm } from "src/components/ProjectForm";

let tabs = ["View", "Edit"];

const ProjectForm: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Dashboard">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      {activeTab === "View" ? <ViewForm /> : <EditForm />}
    </div>
  );
};

ProjectForm.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectForm;
