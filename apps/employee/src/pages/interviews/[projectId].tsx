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

const InterviewDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [rating, setRating] = useState<Record<string, number>>({});

  const { data: res } = useSWR<ResponseType<any>>(
    query.projectId && `/employee/interviews/${query.projectId}`
  );
  const { run, loading } = useApi(
    "POST",
    `/employee/projects/${query.projectId}/add-review`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Interview Guide</h3>
        <Input
          disabled
          defaultValue={res?.data.name}
          label="Project Name"
          labelClassName="md:text-lg"
        />
        <div className="text-lg font-semibold !-mb-4">Hypothesis rating</div>
        {res?.data.hypotheses.map((h: any, idx: number) => (
          <div key={idx} className="border p-5 rounded border-gray-300">
            <h4>{h.hypothesis}</h4>

            <div className="font-medium space-y-2 mt-5">
              {h.questions.map((q: string, qIdx: number) => (
                <>
                  <p key={qIdx}>
                    Q{qIdx + 1}: {q}
                  </p>
                  <StarRating
                    className="ml-auto scale-[65%]"
                    value={rating[`${idx}-${qIdx}`]}
                    setValue={(x) =>
                      setRating({ ...rating, [`${idx}-${qIdx}`]: x })
                    }
                  />
                </>
              ))}
            </div>
          </div>
        ))}
        <Textarea
          label="Review (optional)"
          labelClassName="md:text-lg"
          rows={4}
        />
        <Button
          btn="success"
          loading={loading}
          className="w-full mx-auto"
          onClick={async () => {
            const res = await run({
              body: JSON.stringify({ rating }),
            });
            if (res && res.success)
              showToast("success", "Review added successfully", res.message);
            else showToast("error", "Unable to save review", res.error);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

InterviewDetails.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default InterviewDetails;
