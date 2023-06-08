import useSWR from "swr/immutable";
import React from "react";
import { ResponseType } from "../../types";
import { Spinner } from "../../ui";

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
      {isLoading ? (
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
  let totalQuestions = 0;
  const hypotheses = employee?.[0]?.score?.map(({ hypothesis }: any) => {
    totalQuestions += hypothesis?.length || 0;
    return hypothesis;
  });

  return (
    <div className="w-full overflow-x-scroll">
      <h4>{interviewTitle}</h4>
      <div className="bg-gray-100 f">
        <div
          style={{ width: 144 }}
          className="py-10 w-36 border border-slate-300 font-semibold text-center"
        >
          Person
        </div>
        {hypotheses.map((questions: any, idx: number) => (
          <div
            key={idx}
            // style={{
            //   width: `${(100 * questions.length) / totalQuestions}%`,
            // }}
            className="text-center font-semibold flex-1"
          >
            <div className="p-4 border border-slate-300">
              Hypothesis {idx + 1}
            </div>
            <div className="f">
              {questions.map((x: any, idx: number) => (
                <div key={idx} className="flex-1 p-4 border border-slate-300">
                  Q {idx + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {employee?.map((x: any, idx: number) => (
        <div key={idx} className="text-center f">
          <div className="border border-slate-300 w-36 p-4">
            Employee {x.userId?.substr(0, 2)}
          </div>
          {x.score.map(({ hypothesis }: any, idx: number) => (
            <div key={idx} className="text-center flex-1">
              <div className="f">
                {hypothesis.map((x: any, idx: number) => (
                  <div key={idx} className="flex-1 p-4 border border-slate-300">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="bg-gray-50 border border-slate-300 h-14"></div>
      {coach?.map((x: any, idx: number) => (
        <div key={idx} className="text-center f">
          <div className="border border-slate-300 w-36 p-4">
            Coach {x.userId?.substr(0, 2)}
          </div>
          {x.score.map(({ hypothesis }: any, idx: number) => (
            <div key={idx} className="text-center flex-1">
              <div className="f">
                {hypothesis.map((x: any, idx: number) => (
                  <div key={idx} className="flex-1 p-4 border border-slate-300">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
