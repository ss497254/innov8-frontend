import { NextPageWithLayout, PageTopBar, TabButtons } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";
import { ProjectStageContainer } from "common/src/components";

let tabs = ["Overview", "List", "Board", "Timeline", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8 max-w-7xl mx-auto gap-6 flex-wrap">
        <ProjectStageContainer
          edit
          name="Idea generation"
          color="bg-emerald-300"
          url="/employee/projects/drafts"
        />
        <ProjectStageContainer
          name="Idea screening"
          color="bg-violet-300"
          url="/employee/projects"
        />
        <ProjectStageContainer
          name="Bussiness idea validation"
          color="bg-orange-300"
          url="/employee/projects/bussiness-idea-validation"
        />
      </div>
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
