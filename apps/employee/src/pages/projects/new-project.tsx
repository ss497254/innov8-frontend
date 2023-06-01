import { NextPageWithLayout } from "common/src/types";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { NewProjectForm } from "src/components/Froms/NewProjectForm";

const Projects: NextPageWithLayout = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-full p-4 md:p-6">
      <NewProjectForm />
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
