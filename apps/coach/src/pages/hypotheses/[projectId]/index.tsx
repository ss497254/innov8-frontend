import { NextPageWithLayout } from "common/src/types";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { HypothesisTable } from "common/src/components";
import { ProjectScoreTable } from "common/src/components";

const ProjectView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const projectId = query.projectId as string;

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <HypothesisTable role="coach" projectId={projectId} />
        <ProjectScoreTable role="coach" projectId={projectId} />
      </div>
    </div>
  );
};

ProjectView.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectView;
