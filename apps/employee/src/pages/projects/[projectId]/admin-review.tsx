import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { ProjectField } from "common/src/ui";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWRImmutable from "swr/immutable";

const ProjectView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: res } = useSWRImmutable<ResponseType<ProjectType>>(
    query.projectId && `/employee/projects/${query.projectId}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <ProjectField heading="Project Name" headingClassName="md:text-lg">
          {res?.data.name}
        </ProjectField>
        <ProjectField heading="Elevator pitch" headingClassName="md:text-lg">
          {res?.data.elevatorPitch}
        </ProjectField>
        <ProjectField heading="Summary" headingClassName="md:text-lg">
          {res?.data.summary}
        </ProjectField>
        <ProjectField
          heading="How will you capture value?"
          headingClassName="md:text-lg"
        >
          {res?.data.captureValue}
        </ProjectField>
        <ProjectField
          heading="Do you have the competencies within your team to build the MVP?"
          headingClassName="md:text-lg"
        >
          {res?.data.teamOverview}
        </ProjectField>
        <ProjectField
          heading="Please edit and finalize your pitch deck using the template"
          headingClassName="md:text-lg"
        >
          {res?.data.slideLink}
        </ProjectField>
      </div>
    </div>
  );
};

ProjectView.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectView;
