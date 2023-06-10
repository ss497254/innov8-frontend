import { InterviewSummaryCard, useUserStore } from "common";
import { showToast } from "common/src/lib/showToast";
import {
  InterviewType,
  NextPageWithLayout,
  ResponseType,
} from "common/src/types";
import { ProjectField, Spinner, StarRating, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

const InterviewFormView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { user } = useUserStore();
  const [overallRating, setOverallRating] = useState(1);

  const { data: res, isLoading } = useSWR<ResponseType<InterviewType>>(
    query.interviewId && `/coach/interviews/${query.interviewId}`
  );

  const score = useRef<{ hypothesis: string; questions: number[] }[]>([]);
  useSWR<ResponseType<{ coach: any[] }>>(
    query.interviewId && `/coach/project-score/${query.interviewId}`,
    {
      onSuccess: ({ data }) => {
        const res = data.coach?.find((x: any) => x.userId === user!.id);

        if (!res) {
          return showToast("error", "Review not found");
        }
        score.current = res.score;
        setOverallRating(res.overallRating);
      },
    }
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Your Review</h3>
        {isLoading || !res?.success ? (
          <Spinner className="mx-auto min-h-[200px]" size={40} />
        ) : (
          <>
            <InterviewSummaryCard {...res.data} />
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
                        value={score.current?.[idx]?.questions[qIdx]}
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
            <StarRating className="mx-auto" value={overallRating} />
          </>
        )}
      </div>
    </div>
  );
};

InterviewFormView.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default InterviewFormView;
