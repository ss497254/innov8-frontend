import React, { useState } from "react";
import useSWR from "swr";
import { ResponseType } from "../../types";
import { Spinner } from "../../ui";
import { ScoreTable } from "./ScoreTable";

interface ProjectScoreTableProps extends React.PropsWithChildren {
  projectId: string;
  role: string;
}

export const ProjectScoreTable: React.FC<ProjectScoreTableProps> = ({
  projectId,
  role,
}) => {
  const [cumulativeScore, setCumulativeScore] = useState({
    hypotheses: {} as any,
    completed: [] as string[],
    overallRating: { sum: 0, n: 0 },
  });
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
        <>
          {res.data.map((x, idx) => (
            <ScoreTable
              key={idx}
              setCumulativeScore={setCumulativeScore}
              {...x}
            />
          ))}
          <h3 className="pt-5">Cumulative Score</h3>
          {Object.keys(cumulativeScore.hypotheses).map((x, idx) => (
            <div className="p-3 my-2 space-y-3 b-table" key={idx}>
              <h4 title={x}>Hypothesis {idx + 1}</h4>
              <p className="font-medium">
                Cumulative Score:&nbsp;
                {(
                  cumulativeScore.hypotheses[x].sum /
                  cumulativeScore.hypotheses[x].n
                ).toFixed(3)}
              </p>
            </div>
          ))}
          <div className="p-3 my-2 space-y-3 b-table">
            <h4>Overall Rating</h4>
            <p className="font-medium">
              Cumulative Score:&nbsp;
              {(
                cumulativeScore.overallRating?.sum /
                cumulativeScore.overallRating?.n
              ).toFixed(3)}
            </p>
          </div>
        </>
      ) : (
        <div className="c min-h-[200px] h-full">
          <p>No Score found</p>
        </div>
      )}
    </div>
  );
};
