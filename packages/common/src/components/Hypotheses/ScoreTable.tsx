import { useMemo } from "react";
import { HypothesesReviewType } from "../../types";

interface ProjectScoreProps extends React.PropsWithChildren {
  employee: HypothesesReviewType[];
  coach: HypothesesReviewType[];
  average: HypothesesReviewType;
  variance: HypothesesReviewType;
  interviewTitle: string;
  setCumulativeScore: any;
}

const Row: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div className={["min-w-[500px] f text-center", className].join(" ")}>
    {children}
  </div>
);

export const ScoreTable: React.FC<ProjectScoreProps> = ({
  employee,
  average,
  coach,
  variance,
  interviewTitle,
  setCumulativeScore,
}) => {
  const { overallVariance } = useMemo(() => {
    let totalQuestions = 0,
      totalHypothesis = 0;

    let overallVariance: Omit<HypothesesReviewType, "userId"> = {
      score: average.score.map((x) => ({
        ...x,
        questions: Array(x.questions.length).fill(0),
      })),
      overallRating: 0,
    };

    coach?.forEach(({ score, overallRating }) => {
      overallVariance.overallRating +=
        Math.abs(overallRating - average.overallRating) ** 2 / 4;

      return score.forEach(({ questions }, idx) => {
        questions.forEach((rating, idy) => {
          overallVariance.score[idx].questions[idy] +=
            Math.abs(rating - average.score[idx].questions[idy]) ** 2 / 4;
        });
      });
    });

    return {
      totalHypothesis,
      totalQuestions,
      overallVariance,
    };
  }, []);

  return (
    <div className="w-full b-table overflow-x-scroll remove-scroll">
      <Row className="p-4 font-bold b-table text-xl bg-gray-100 justify-center">
        {interviewTitle}
      </Row>
      <Row className="bg-gray-100">
        <div className="c w-36 b-table font-semibold">
          <p>Person</p>
        </div>
        {average.score.map(({ questions, hypothesis }, idx) => (
          <div
            key={idx}
            style={{
              flexGrow: questions.length,
            }}
            className="text-center flex-1 font-semibold"
          >
            <div className="py-4 b-table" title={hypothesis}>
              Hypothesis {idx + 1}
            </div>
            <div className="f">
              {questions.map((x: any, idx: number) => (
                <div key={idx} className="flex-1 py-4 b-table">
                  Q{idx + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="c w-20 text-center b-table font-semibold">
          <p>Overall Rating</p>
        </div>
      </Row>
      {employee?.map(({ score, userId, overallRating }, idx) => (
        <Row key={idx}>
          <div className="b-table w-36 p-4">
            Employee {userId?.substring(0, 2)}
          </div>
          {score.map(({ questions }) =>
            questions.map((x, idx) => (
              <div key={idx} className="py-4 flex-1 b-table">
                {x}
              </div>
            ))
          )}
          <div className="c w-20 text-center b-table">
            <p>{overallRating}</p>
          </div>
        </Row>
      ))}
      <Row className="font-bold bg-gray-100">
        <div className="w-36 py-4 b-table">E. Average</div>
        {average.score.map(({ questions }) =>
          questions.map((x, idx) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{average.overallRating.toFixed(3)}</p>
        </div>
      </Row>
      <Row className="font-bold bg-gray-100">
        <div className="w-36 py-4 b-table">E. Variance</div>
        {variance.score.map(({ questions }) =>
          questions.map((x, idx) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{variance.overallRating.toFixed(3)}</p>
        </div>
      </Row>
      <Row className="bg-gray-400 h-2 b-table" />
      {coach?.map(({ score, userId, overallRating }, idx) => (
        <Row key={idx}>
          <div className="b-table w-36 p-4">
            Employee {userId?.substring(0, 2)}
          </div>
          {score.map(({ questions }) =>
            questions.map((x, idx) => (
              <div key={idx} className="py-4 flex-1 b-table">
                {x}
              </div>
            ))
          )}
          <div className="c w-20 text-center b-table">
            <p>{overallRating}</p>
          </div>
        </Row>
      ))}
      <Row className="bg-gray-100 h-14 font-bold">
        <div className="w-36 py-4 b-table">O. Variance</div>
        {overallVariance.score.map(({ questions }) =>
          questions.map((x, idx) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{overallVariance.overallRating?.toFixed(3)}</p>
        </div>
      </Row>
    </div>
  );
};
