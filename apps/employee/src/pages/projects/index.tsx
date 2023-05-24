import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectsTopBar } from "src/components/Projects/ProjectsTopBar";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-100 h-full p-4">
      <ProjectsTopBar />
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
