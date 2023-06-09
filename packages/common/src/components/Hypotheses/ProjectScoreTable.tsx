// @ts-nocheck
import React, { useMemo } from "react";
import useSWR from "swr";
import { ResponseType } from "../../types";
import { Spinner } from "../../ui";

interface ProjectScoreTableProps extends React.PropsWithChildren {
  projectId: string;
  role: string;
}

export const ProjectScoreTable: React.FC<ProjectScoreTableProps> = ({
  projectId,
  role,
}) => {
  const {
    data: res,
    isLoading,
    error,
  } = useSWR<ResponseType<any[]>>(
    projectId && `/${role}/project-score-all/${projectId}`
  );

  return (
    <div className="space-y-5">
      <h3>Project Score</h3>
      {isLoading || !projectId ? (
        <div className="c min-h-[200px] h-full">
          <Spinner size={28} />
        </div>
      ) : error ? (
        <div className="c min-h-[200px] h-full">
          <p>Cannot load hypotheses</p>
        </div>
      ) : res?.data && res.data.length ? (
        res.data.map((x, idx) => <ScoreTable key={idx} {...x} />)
      ) : (
        <div className="c min-h-[200px] h-full">
          <p>No Score found</p>
        </div>
      )}
    </div>
  );
};

const ScoreTable = ({ employee, interviewTitle, coach }: any) => {
  const { hypotheses, average, variance, overallVariance } = useMemo(() => {
    let totalQuestions = 0,
      totalHypothesis = 0,
      hypotheses: any;

    let average: number[][] = [],
      variance: number[][] = [],
      overallVariance: number[][] = [];

    average.overallRating = 0;
    variance.overallRating = 0;
    overallVariance.overallRating = 0;

    if (coach)
      hypotheses = coach[0]?.score?.map(({ hypothesis }: any) => {
        average.push(Array(hypothesis.length).fill(0));
        variance.push(Array(hypothesis.length).fill(0));
        overallVariance.push(Array(hypothesis.length).fill(0));

        totalHypothesis++;
        totalQuestions += hypothesis?.length;
        return hypothesis;
      });
    else
      hypotheses = employee[0].score?.map(({ hypothesis }: any) => {
        average.push(Array(hypothesis.length).fill(0));
        variance.push(Array(hypothesis.length).fill(0));
        overallVariance.push(Array(hypothesis.length).fill(0));

        totalHypothesis++;
        totalQuestions += hypothesis?.length;
        return hypothesis;
      });

    employee?.forEach((x: any) => {
      average.overallRating += parseInt(x.overallRating || 0);

      return x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          average[idx][idy] += rating;
        });
      });
    });
    let x = average.overallRating / employee.length;
    average = average.map((x) => x.map((y) => y / employee.length));
    average.overallRating = x;

    employee?.forEach((x: any) => {
      variance.overallRating +=
        Math.abs(x.overallRating - average.overallRating) ** 2;

      return x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          variance[idx][idy] += Math.abs(rating - average[idx][idy]) ** 2;
        });
      });
    });
    if (employee.length > 1) {
      let x = variance.overallRating / (employee.length - 1);
      variance = variance.map((x) => x.map((y) => y / (employee.length - 1)));
      variance.overallRating = x;
    }

    coach?.forEach((x: any) => {
      overallVariance.overallRating +=
        Math.abs(x.overallRating - average.overallRating) ** 2 / 4;

      return x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          overallVariance[idx][idy] +=
            Math.abs(rating - average[idx][idy]) ** 2 / 4;
        });
      });
    });

    return {
      totalHypothesis,
      totalQuestions,
      hypotheses,
      average,
      variance,
      overallVariance,
    };
  }, []);

  return (
    <div className="w-full b-table overflow-x-scroll remove-scroll">
      <div className="min-w-[500px] bg-gray-100 b-table text-center p-4 font-bold text-xl">
        {interviewTitle}
      </div>
      <div className="min-w-[500px] bg-gray-100 f">
        <div className="c w-36 b-table font-semibold">
          <p>Person</p>
        </div>
        {hypotheses?.map((questions: any, idx: number) => (
          <div
            key={idx}
            style={{
              flexGrow: questions.length,
            }}
            className="text-center flex-1 font-semibold"
          >
            <div className="py-4 b-table">Hypothesis {idx + 1}</div>
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
      </div>
      {employee?.map((x: any, idx: number) => (
        <div key={idx} className="min-w-[500px] text-center f">
          <div className="b-table w-36 p-4">
            Employee {x.userId?.substr(0, 2)}
          </div>
          {x.score.map(({ hypothesis }: any) =>
            hypothesis.map((x: any, idx: number) => (
              <div key={idx} className="py-4 flex-1 b-table">
                {x}
              </div>
            ))
          )}
          <div className="c w-20 text-center b-table">
            <p>{x.overallRating}</p>
          </div>
        </div>
      ))}
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">E. Average</div>
        {average.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{average.overallRating?.toFixed(3)}</p>
        </div>
      </div>
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">E. Variance</div>
        {variance.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{variance.overallRating?.toFixed(3)}</p>
        </div>
      </div>
      <div className="min-w-[500px] bg-gray-200 b-table h-5"></div>
      {coach?.map((x: any, idx: number) => (
        <div key={idx} className="min-w-[500px] text-center f">
          <div className="b-table w-36 p-4">Coach {x.userId?.substr(0, 2)}</div>
          {x.score.map(({ hypothesis }: any) =>
            hypothesis.map((x: any, idx: number) => (
              <div key={idx} className="py-4 flex-1 b-table">
                {x}
              </div>
            ))
          )}
          <div className="c w-20 text-center b-table">
            <p>{x.overallRating}</p>
          </div>
        </div>
      ))}
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">O. Variance</div>
        {overallVariance.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x.toFixed(3)}
            </div>
          ))
        )}
        <div className="c w-20 text-center b-table">
          <p>{overallVariance.overallRating?.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
};
