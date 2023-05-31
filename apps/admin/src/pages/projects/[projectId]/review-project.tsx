import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { Button, Input, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWRImmutable from "swr/immutable";

const ReviewProject: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [email, setEmail] = useState("");

  const { data: res, isLoading } = useSWRImmutable<ResponseType<ProjectType>>(
    query.projectId && `/admin/projects/${query.projectId}`
  );
  const { run, loading } = useApi(
    "POST",
    `/admin/projects/${query.projectId}/add-judge`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <Input
          disabled
          defaultValue={res?.data.name}
          label="Project Name"
          labelClassName="md:text-lg"
        />
        <Textarea
          disabled
          label="Elevator pitch"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.elevatorPitch}
        />
        <Textarea
          disabled
          label="Summary"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.summary}
        />
        <Textarea
          disabled
          label="How will you capture value?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.captureValue}
        />
        <Textarea
          disabled
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.teamOverview}
        />
        <Textarea
          disabled
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.files}
        />
        <div className="border rounded-md p-5">
          <h4>Assign Judge</h4>
          <div className="my-8">
            <Input
              label="Judge email"
              placeholder="Enter judge email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="f space-x-4 justify-end">
            <Button
              btn="success"
              loading={loading}
              className="w-full"
              onClick={async () => {
                const res = await run({ body: JSON.stringify({ email }) });
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
    </div>
  );
};

ReviewProject.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ReviewProject;
