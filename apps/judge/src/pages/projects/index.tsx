import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectTopBar } from "src/components/Projects/ProjectTopBar";

const tabs = ["To do", "Done"];

const Projects: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <ProjectTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
