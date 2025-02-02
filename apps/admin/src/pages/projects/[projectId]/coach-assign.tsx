import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
  UserType,
} from "common/src/types";
import { Button, ProjectField } from "common/src/ui";
import { Avatar } from "common/src/ui/User";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { AssignCoach } from "src/components/Projects/AssignCoach";
import useSWR from "swr";

const ReviewProject: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [coach, setCoach] = useState<UserType>();

  const { data: res } = useSWR<ResponseType<ProjectType>>(
    query.projectId && `/admin/projects/idea-validation/${query.projectId}`,
    {
      onSuccess: (res) => {
        //@ts-ignore
        setCoach(res?.data.coach);
      },
    }
  );
  const { run, loading } = useApi(
    "POST",
    `/admin/projects/idea-validation/${query.projectId}/add-coach`
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
        <AssignCoach value={coach} onChange={setCoach} />
        <div className="f space-x-4 justify-end">
          <Button
            btn="success"
            loading={loading}
            className="w-full"
            onClick={async () => {
              const res = await run({ body: JSON.stringify({ coach }) });
              if (res && res.success)
                showToast("success", "Email added successfully", res.message);
              else showToast("error", "Unable to add email", res.error);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

ReviewProject.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ReviewProject;
