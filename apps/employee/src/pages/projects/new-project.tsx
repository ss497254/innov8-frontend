import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectForm } from "src/components/Froms/ProjectForm";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <ProjectForm />
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
