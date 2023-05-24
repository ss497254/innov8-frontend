import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectForm } from "src/components/Froms/ProjectForm";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-100 min-h-full px-4 py-6">
      <ProjectForm />
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
