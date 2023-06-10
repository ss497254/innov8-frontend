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
            (rating - average.score[idx].questions[idy]) ** 2 / 2;
        });
      });
    });

    setCumulativeScore((x: any) => {
      if (x.completed.includes(interviewTitle)) return x;

      overallVariance.score.forEach((y) => {
        if (x.hypotheses[y.hypothesis]) {
          x.hypotheses[y.hypothesis].sum += y.questions.reduce((a, b) => a + b);
          x.hypotheses[y.hypothesis].n += y.questions.length;
        } else {
          x.hypotheses[y.hypothesis] = {
            sum: y.questions.reduce((a, b) => a + b),
            n: y.questions.length,
          };
        }
      });

      x.overallRating.sum += overallVariance.overallRating;
      x.overallRating.n++;

      x.completed.push(interviewTitle);
      return { ...x };
    });

    return {
      totalHypothesis,
      totalQuestions,
      overallVariance,
    };
  }, [employee, average, coach, variance]);

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
              {questions.map((_, idx) => (
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
              {x}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{average.overallRating}</p>
        </div>
      </Row>
      <Row className="font-bold bg-gray-100">
        <div className="w-36 py-4 b-table">E. Variance</div>
        {variance.score.map(({ questions }) =>
          questions.map((x, idx) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{variance.overallRating}</p>
        </div>
      </Row>
      <Row className="bg-gray-400 h-2 b-table" />
      {coach?.map(({ score, userId, overallRating }, idx) => (
        <Row key={idx}>
          <div className="b-table w-36 p-4">
            Coach {userId?.substring(0, 2)}
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
              {x}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{overallVariance.overallRating}</p>
        </div>
      </Row>
    </div>
  );
};
