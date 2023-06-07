import { useUserStore } from "common";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
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
  const [trigger, render] = useState(1);

  let score = useRef<{ hypothesis: number[] }[]>([]);
  const interviewId = query.interviewId as string;
  const { data: res, isLoading } = useSWR<ResponseType<InterviewType>>(
    interviewId && `/coach/interviews/${interviewId}`,
    {
      onSuccess: ({ data: { hypotheses } }) => {
        score.current = hypotheses.map((x) => ({
          hypothesis: x.questions.map(() => 0),
        }));
      },
    }
  );
  const { run, loading } = useApi(
    "POST",
    `/coach/project-score/${interviewId}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Interview Guide</h3>
        {isLoading || !res?.success ? (
          <Spinner className="mx-auto min-h-[200px]" size={40} />
        ) : (
          <>
            <ProjectField
              heading="Interview Title"
              headingClassName="md:text-lg font-semibold"
            >
              {res?.data.interviewTitle}
            </ProjectField>
            <ProjectField
              heading="Project Name"
              headingClassName="md:text-lg font-semibold"
            >
              {res?.data.name}
            </ProjectField>
            <div className="text-lg font-semibold !-mb-4">Hypothesis score</div>
            {res?.data.hypotheses.map((h, idx) => (
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
                        value={score.current[idx]?.hypothesis[qIdx]}
                        setValue={(x) => {
                          if (!score.current[idx]) return;

                          score.current[idx].hypothesis[qIdx] = x;
                          render(-1 * trigger);
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
            <Button
              btn="success"
              loading={loading}
              className="w-full mx-auto"
              onClick={async () => {
                console.log(score.current);

                for (let x of score.current) {
                  for (let y of x.hypothesis) {
                    if (y < 1) {
                      showToast("warning", "Please complete the form.");
                      return;
                    }
                  }
                }
                const res = await run({
                  body: JSON.stringify({
                    score: score.current,
                    interviewId,
                    userId: user?.id,
                    role: user?.role,
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
