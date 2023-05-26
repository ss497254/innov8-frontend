import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";
import { ProjectStatusGroup } from "src/components/Projects/ProjectStatusGroup";

let tabs = ["Overview", "New", "Working", "Completed", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ProjectStatusGroup
        name={tabs[1]}
        projects={[
          {
            title: "Wireframe",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 2,
            comments: 5,
          },
          {
            title: "UX Design",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 5,
            comments: 12,
          },
        ]}
      />
      <ProjectStatusGroup
        name={tabs[2]}
        projects={[
          {
            title: "Wireframe",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 2,
            comments: 5,
          },
          {
            title: "UX Design",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 5,
            comments: 12,
          },
        ]}
      />
      <ProjectStatusGroup
        name={tabs[3]}
        projects={[
          {
            title: "Wireframe",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 2,
            comments: 5,
          },
          {
            title: "UX Design",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
            files: 5,
            comments: 12,
          },
        ]}
      />
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
