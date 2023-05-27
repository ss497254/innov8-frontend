import { NextPageWithLayout } from "common";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectSummaryCard } from "common/src/components";
import { ProjectTopBar } from "src/components/Projects/ProjectTopBar";

const tabs = ["In progress", "Completed"];

const projects = [
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
];

const Projects: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <ProjectTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="my-6 space-y-4">
        {projects.map((project, idx) => (
          <ProjectSummaryCard key={idx} {...project} />
        ))}
      </div>
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
