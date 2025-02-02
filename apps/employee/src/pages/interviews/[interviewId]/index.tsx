import {
  HypothesesReviewType,
  InterviewSummaryCard,
  useForceRender,
} from "common";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import { useUserStore } from "common/src/stores";
import {
  InterviewType,
  NextPageWithLayout,
  ResponseType,
} from "common/src/types";
import {
  Button,
  ProjectField,
  Spinner,
  StarRating,
  Textarea,
} from "common/src/ui";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr/immutable";

const InterviewForm: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { user } = useUserStore();
  const render = useForceRender();
  const [overallRating, setOverallRating] = useState(1);

  const score = useRef<HypothesesReviewType["score"]>([]);
  const interviewId = query.interviewId as string;
  const { data: res, isLoading } = useSWR<ResponseType<InterviewType>>(
    interviewId && `/employee/interviews/${interviewId}`,
    {
      onSuccess: ({ data: { hypotheses } }) => {
        score.current = hypotheses.map((x) => ({
          ...x,
          questions: x.questions.map(() => 1),
        }));
      },
    }
  );
  const { run, loading } = useApi(
    "POST",
    `/employee/project-score/${interviewId}`
  );
  const { projectId, interviewTitle } = res?.data || {};

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Interview Review</h3>
        {isLoading || !res?.success ? (
          <Spinner className="mx-auto min-h-[200px]" size={40} />
        ) : (
          <>
            <InterviewSummaryCard {...res.data} />
            <ProjectField
              heading="Project Name"
              headingClassName="md:text-lg font-semibold"
            >
              {res.data.name}
            </ProjectField>
            <div className="text-lg font-semibold !-mb-4">Hypothesis score</div>
            {res.data.hypotheses.map((h, idx) => (
              <div key={idx} className="border p-5 rounded border-gray-300">
                <h4>{h.hypothesis}</h4>
                <div className="font-medium space-y-2 mt-5">
                  {h.questions.map((q: string, qIdx: number) => (
                    <Fragment key={qIdx}>
                      <p>
                        Q{qIdx + 1}: {q}
                      </p>
                      <StarRating
                        className="ml-auto scale-[65%]"
                        value={score.current[idx]?.questions[qIdx]}
                        setValue={(x) => {
                          if (!score.current[idx]) return;

                          score.current[idx].questions[qIdx] = x;
                          render();
                        }}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
            <Textarea
              label="Review (optional)"
              labelClassName="md:text-lg"
              rows={4}
            />
            <p className="md:text-lg font-medium">Overall Rating</p>
            <StarRating
              className="mx-auto"
              value={overallRating}
              setValue={setOverallRating}
            />
            <Button
              btn="success"
              loading={loading}
              className="w-full mx-auto"
              onClick={async () => {
                const res = await run({
                  body: JSON.stringify({
                    projectId,
                    interviewTitle,
                    score: score.current,
                    userId: user?.id,
                    role: user?.role,
                    overallRating,
                  }),
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
          </>
        )}
      </div>
    </div>
  );
};

InterviewForm.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default InterviewForm;
