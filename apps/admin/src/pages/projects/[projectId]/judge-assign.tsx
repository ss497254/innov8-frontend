import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
  UserType,
} from "common/src/types";
import { Button, ProjectField } from "common/src/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { AssignJudge } from "src/components/Projects/AssignJudge";
import useSWRImmutable from "swr/immutable";

const ReviewProject: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [judge, setJudge] = useState<UserType>();

  const { data: res } = useSWRImmutable<ResponseType<ProjectType>>(
    query.projectId && `/admin/projects/${query.projectId}`,
    {
      onSuccess: (res) => {
        //@ts-ignore
        setJudge(res?.data.judge);
      },
    }
  );
  const { run, loading } = useApi(
    "POST",
    `/admin/projects/${query.projectId}/add-judge`
  );

  console.log(judge);

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
        <AssignJudge value={judge} onChange={setJudge} />
        <div className="f space-x-4 justify-end">
          <Button
            btn="success"
            loading={loading}
            className="w-full"
            onClick={async () => {
              const res = await run({ body: JSON.stringify({ judge }) });
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
