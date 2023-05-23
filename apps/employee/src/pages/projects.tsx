import { IconButton } from "common";
import { ThreeDotsIcon } from "common/src/icons";
import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectCard } from "src/components/Projects/ProjectCard";
import { ProjectStageContainer } from "src/components/Projects/ProjectStageContainer";
import { ProjectsTopBar } from "src/components/Projects/ProjectsTopBar";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-100 h-full p-4">
      <ProjectsTopBar />
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

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
