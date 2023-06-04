import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { ProjectField } from "common/src/ui";
import { Avatar } from "common/src/ui/User";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

const ProjectView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: res } = useSWR<ResponseType<ProjectType>>(
    query.projectId && `/coach/projects/${query.projectId}`
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
        <div className="border rounded-md p-5 space-y-4">
          <h4>Judge assigned</h4>
          <h3 className="f ic">
            <Avatar
              size={50}
              src={res?.data.judge?.avatarUrl}
              className="mr-4"
            />
            {res?.data.judge?.firstName + " " + res?.data.judge?.lastName}
          </h3>
        </div>
        <div className="!-mb-6 font-semibold">Team Members</div>
        <div className="f jb items-end">
          <div className="f">
            {res?.data.teamMembers?.map((member, idx) => (
              <Avatar
                size={40}
                key={idx}
                className="mt-2"
                src={member.avatarUrl}
              />
            ))}
          </div>
          <h4 className="text-lg">
            {res?.data.updatedAt &&
              new Date(res?.data.updatedAt).toDateString()}
          </h4>
        </div>
      </div>
    </div>
  );
};

ProjectView.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectView;
