import { ResponseType } from "common/src/types";
import { Spinner } from "common/src/ui";
import React from "react";
import useSWR from "swr/immutable";

interface props {
  projectId: string;
}

export const HypothesisTable: React.FC<props> = ({ projectId }) => {
  const {
    data: res,
    isLoading,
    error,
  } = useSWR<ResponseType<{ hypotheses: any[] }>>(
    "/employee/hypotheses/" + projectId
  );

  return (
    <div className="space-y-5 py-4">
      <h2>Hypothesis</h2>
      {isLoading ? (
        <div className="c min-h-[200px] h-full">
          <Spinner size={28} className="-mt-14" />
        </div>
      ) : error ? (
        <div className="c min-h-[200px] h-full">
          <p className="-mt-14">Cannot load hypotheses</p>
        </div>
      ) : res?.data.hypotheses.length ? (
        res?.data.hypotheses.map((h, idx) => (
          <div key={idx} className="border p-5 rounded border-gray-300">
            <h4>{h.hypothesis}</h4>

            <div className="font-medium space-y-2 mt-5">
              {h.questions.map((q: string, idx: number) => (
                <p key={idx}>
                  Q{idx + 1}: {q}
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="c min-h-[200px] h-full">
          <p className="-mt-14">No hypotheses</p>
        </div>
      )}
    </div>
  );
};
