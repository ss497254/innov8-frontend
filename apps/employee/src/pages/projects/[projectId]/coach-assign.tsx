import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { ProjectField } from "common/src/ui";
import { Avatar } from "common/src/ui/User";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWRImmutable from "swr/immutable";

const CoachAssign: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: res } = useSWRImmutable<ResponseType<ProjectType>>(
    query.projectId && `/employee/projects/idea-validation/${query.projectId}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Coach Assign</h3>
        <div className="!mt-0 text-lg">Admin will assign coach</div>
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

CoachAssign.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default CoachAssign;
