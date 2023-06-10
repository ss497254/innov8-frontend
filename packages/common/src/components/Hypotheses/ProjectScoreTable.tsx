import React from "react";
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
