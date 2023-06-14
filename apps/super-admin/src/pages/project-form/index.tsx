import {
  NextPageWithLayout,
  PageTopBar,
  ProjectFormType,
  ResponseType,
  Spinner,
  TabButtons,
} from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { EditForm, ViewForm } from "src/components/ProjectForm";
import useSWR from "swr";

let tabs = ["View", "Edit"];

const ProjectForm: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data: res, isLoading } = useSWR<ResponseType<ProjectFormType>>(
    "/super-admin/project-form"
  );

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Dashboard">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      {isLoading ? (
        <Spinner />
      ) : activeTab === "View" ? (
        <ViewForm fields={res?.data.fields} />
      ) : (
        <EditForm initialFields={res?.data.fields} />
      )}
    </div>
  );
};

ProjectForm.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectForm;
