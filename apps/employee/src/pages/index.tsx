import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { DashboardTopBar } from "src/components/Dashboard/DashboardTopBar";
import { ProjectStageContainer } from "src/components/Projects/ProjectStageContainer";

let tabs = ["Overview", "List", "Board", "Timeline", "More"];

const Home: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="bg-gray-100 h-full p-4">
      <DashboardTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="f mt-8 max-w-7xl mx-auto space-x-6">
        <ProjectStageContainer
          name="Idea generation"
          color="bg-emerald-300"
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
        ></ProjectStageContainer>
        <ProjectStageContainer
          name="Idea screening"
          color="bg-violet-300"
          projects={[
            {
              title: "Illustration of onboarding",
              desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
              files: 3,
              comments: 8,
            },
          ]}
        ></ProjectStageContainer>
        <ProjectStageContainer
          name="Bussiness idea validation"
          color="bg-orange-300"
          projects={[
            {
              title: "Information Architecture",
              desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque.",
              files: 7,
              comments: 18,
            },
          ]}
        ></ProjectStageContainer>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
