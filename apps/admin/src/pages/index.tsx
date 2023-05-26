import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";

let tabs = ["Overview", "New", "Working", "Completed", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-gray-100 min-h-full p-4">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
