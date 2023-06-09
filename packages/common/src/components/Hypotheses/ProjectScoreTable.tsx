import useSWR from "swr/immutable";
import React, { useMemo } from "react";
import { ResponseType } from "../../types";
import { Spinner } from "../../ui";
import { availableParallelism } from "os";

interface ProjectScoreTableProps extends React.PropsWithChildren {
  projectId: string;
}

export const ProjectScoreTable: React.FC<ProjectScoreTableProps> = ({
  projectId,
}) => {
  const {
    data: res,
    isLoading,
    error,
  } = useSWR<ResponseType<any[]>>(
    projectId && `/employee/project-score-all/${projectId}`
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
      ) : res?.data ? (
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

    if (coach)
      hypotheses = coach[0]?.score?.map(({ hypothesis }: any) => {
        average.push(Array(hypothesis.length).fill(0));
        variance.push(Array(hypothesis.length).fill(0));
        overallVariance.push(Array(hypothesis.length).fill(0));

        totalHypothesis++;
        totalQuestions += hypothesis?.length || 0;
        return hypothesis;
      });
    else
      hypotheses = employee[0].score?.map(({ hypothesis }: any) => {
        average.push(Array(hypothesis.length).fill(0));
        variance.push(Array(hypothesis.length).fill(0));
        overallVariance.push(Array(hypothesis.length).fill(0));

        totalHypothesis++;
        totalQuestions += hypothesis?.length || 0;
        return hypothesis;
      });

    employee?.forEach((x: any) =>
      x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          average[idx][idy] += rating;
        });
      })
    );
    average = average.map((x) => x.map((y) => y / employee.length));

    employee?.forEach((x: any) =>
      x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          variance[idx][idy] += Math.abs(rating - average[idx][idy]) ** 2;
        });
      })
    );
    if (employee.length > 1)
      variance = variance.map((x) => x.map((y) => y / (employee.length - 1)));

    coach?.forEach((x: any) =>
      x.score.forEach(({ hypothesis }: any, idx: number) => {
        hypothesis.forEach((rating: number, idy: number) => {
          overallVariance[idx][idy] +=
            Math.abs(rating - average[idx][idy]) ** 2 / 4;
        });
      })
    );

    return {
      totalHypothesis,
      totalQuestions,
      hypotheses,
      average,
      variance,
      overallVariance,
    };
  }, []);

  console.log({ average, variance });

  return (
    <div className="w-full b-table overflow-x-scroll remove-scroll">
      <div className="min-w-[500px] bg-gray-100 b-table text-center p-4 font-bold text-xl">
        {interviewTitle}
      </div>
      <div className="min-w-[500px] bg-gray-100 f">
        <div
          style={{ width: 144 }}
          className="align-middle c w-36 b-table font-semibold"
        >
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
        </div>
      ))}
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">E. Average</div>
        {average.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x}
            </div>
          ))
        )}
      </div>
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">E. Variance</div>
        {variance.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x}
            </div>
          ))
        )}
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
        </div>
      ))}
      <div className="min-w-[500px] bg-gray-100 h-14 f text-center font-bold">
        <div className="w-36 py-4 b-table">O. Variance</div>
        {overallVariance.map((h: any) =>
          h.map((x: any, idx: number) => (
            <div key={idx} className="py-4 flex-1 b-table">
              {x}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
