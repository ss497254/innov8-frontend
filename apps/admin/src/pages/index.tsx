import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";
import { ProjectStatusGroup } from "src/components/Projects/ProjectStatusGroup";

let tabs = ["Overview", "New", "Working", "Completed", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-gray-100 min-h-full p-4 md:p-6 lg:p-8">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ProjectStatusGroup name={tabs[1]} projects={[]} />
      <ProjectStatusGroup name={tabs[2]} projects={[]} />
      <ProjectStatusGroup name={tabs[3]} projects={[]} />
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
