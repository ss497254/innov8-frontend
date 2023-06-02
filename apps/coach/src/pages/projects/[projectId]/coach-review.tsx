import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { Button, Input, StarRating, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

const ReviewProject: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [rating, setRating] = useState<
    Exclude<ProjectType["rating"], undefined>
  >({});
  const [overallRating, setOverallRating] = useState(1);

  const { data: res } = useSWR<ResponseType<ProjectType>>(
    query.projectId && `/coach/projects/${query.projectId}`,
    {
      onSuccess: ({ data: { overallRating = 1, rating = {} } }) => {
        setOverallRating(overallRating);
        setRating(rating);
      },
    }
  );
  const { run, loading } = useApi(
    "POST",
    `/coach/projects/${query.projectId}/add-review`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
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
        <StarRating
          value={rating.elevatorPitch}
          setValue={(x) => setRating({ ...rating, elevatorPitch: x })}
          className="mx-auto scale-75 !mt-1"
        />
        <Textarea
          disabled
          label="Summary"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.summary}
        />
        <StarRating
          value={rating.summary}
          setValue={(x) => setRating({ ...rating, summary: x })}
          className="mx-auto scale-75 !mt-1"
        />
        <Textarea
          disabled
          label="How will you capture value?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.captureValue}
        />
        <StarRating
          value={rating.captureValue}
          setValue={(x) => setRating({ ...rating, captureValue: x })}
          className="mx-auto scale-75 !mt-1"
        />
        <Textarea
          disabled
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.teamOverview}
        />
        <StarRating
          value={rating.teamOverview}
          setValue={(x) => setRating({ ...rating, teamOverview: x })}
          className="mx-auto scale-75 !mt-1"
        />
        <Textarea
          disabled
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.slideLink}
        />
        <StarRating
          value={rating.slideLink}
          setValue={(x) => setRating({ ...rating, slideLink: x })}
          className="mx-auto scale-75 !mt-1"
        />
        <div className="border rounded-md p-5 space-y-4">
          <h4>Overall Rating</h4>
          <StarRating
            value={overallRating}
            setValue={setOverallRating}
            className="mx-auto"
          />
          <div className="f space-x-4 justify-end">
            <Button
              btn="success"
              loading={loading}
              className="w-64 mx-auto"
              onClick={async () => {
                const res = await run({
                  body: JSON.stringify({ overallRating, rating }),
                });
                if (res && res.success)
                  showToast(
                    "success",
                    "Review added successfully",
                    res.message
                  );
                else showToast("error", "Unable to save review", res.error);
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
