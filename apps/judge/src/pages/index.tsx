import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";
import { ProjectStatusGroup } from "common/src/components";

let tabs = ["Overview", "New", "Completed", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ProjectStatusGroup
        name={tabs[1]}
        filter={(x) => x.status === "judge-review"}
        url="/judge/projects"
      />
      <ProjectStatusGroup
        name={tabs[2]}
        filter={(x) => x.status === "rating-completed"}
        url="/judge/projects"
      />
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
