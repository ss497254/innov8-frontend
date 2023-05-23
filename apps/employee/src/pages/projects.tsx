import { IconButton } from "common";
import { ThreeDotsIcon } from "common/src/icons";
import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectCard } from "src/components/Projects/ProjectCard";
import { ProjectsTopBar } from "src/components/Projects/ProjectsTopBar";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-100 h-full p-4">
      <ProjectsTopBar />
      <div className="f mt-8 max-w-7xl mx-auto space-x-8">
        <div className="flex-1 p-6 bg-white rounded-md space-y-4">
          <h3 className="f ic mb-6">
            <span className="bg-emerald-300 rounded mr-4 w-4 h-8" />
            Idea generation
            <span className="flex-1" />
            <IconButton className="!p-2">
              <ThreeDotsIcon />
            </IconButton>
          </h3>
          <ProjectCard
            title="Wireframe"
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque."
            files={2}
            comments={5}
          />
          <ProjectCard
            title="UX Research"
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione fuga voluptatem repellendus neque doloremque molestias dignissimos soluta, rem autem, voluptas cumque nostrum nulla deserunt quia atque. Quo, quidem cumque."
            files={5}
            comments={12}
          />
        </div>
        <div className="flex-1 p-6 bg-white rounded-md">
          <h3 className="f ic mb-6">
            <span className="bg-violet-300 rounded mr-4 w-4 h-8" />
            Idea screening
            <span className="flex-1" />
            <IconButton className="!p-2">
              <ThreeDotsIcon />
            </IconButton>
          </h3>
        </div>
        <div className="flex-1 p-6 bg-white rounded-md">
          <h3 className="f ic mb-6">
            <span className="bg-orange-300 rounded mr-4 w-4 h-8" />
            Business idea validation
            <span className="flex-1" />
            <IconButton className="!p-2">
              <ThreeDotsIcon />
            </IconButton>
          </h3>
        </div>
      </div>
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
