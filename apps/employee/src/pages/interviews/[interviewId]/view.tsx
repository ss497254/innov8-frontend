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
import { Fragment, useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

let score: { hypothesis: number[] }[] = [];

const InterviewFormView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [trigger, render] = useState(1);
  const { user } = useUserStore();

  const { data: res, isLoading } = useSWR<ResponseType<InterviewType>>(
    query.interviewId && `/employee/interviews/${query.interviewId}`
  );

  useSWR<ResponseType<any>>(
    query.interviewId && `/employee/project-score/${query.interviewId}`,
    {
      onSuccess: ({ data }) => {
        score = data.employee?.filter((x: any) => x.userId === user!.id)?.[0]
          ?.score;
        render(-1 * trigger);
      },
    }
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
                        value={score?.[idx]?.hypothesis[qIdx]}
                        setValue={(x) => {
                          if (!score || !score[idx]) return;

                          score[idx].hypothesis[qIdx] = x;
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
