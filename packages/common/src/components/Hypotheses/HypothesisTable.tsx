import { TickIcon } from "common/src/icons";
import { ResponseType } from "common/src/types";
import { Spinner } from "common/src/ui";
import React from "react";
import useSWR from "swr/immutable";

interface props {
  role: string;
  projectId: string;
  value?: any[];
  onChange?: any;
  desc?: string;
}

export const HypothesisTable: React.FC<props> = ({
  role,
  projectId,
  value,
  onChange,
  desc,
}) => {
  const {
    data: res,
    isLoading,
    error,
  } = useSWR<ResponseType<{ hypotheses: any[] }>>(
    projectId && `/${role}/hypotheses/${projectId}`
  );

  return (
    <div className="space-y-5 py-4">
      <h2>Hypotheses</h2>
      {desc && <p className="!mt-1 text-lg">{desc}</p>}
      {isLoading ? (
        <div className="c min-h-[200px] h-full">
          <Spinner size={28} className="-mt-14" />
        </div>
      ) : error ? (
        <div className="c min-h-[200px] h-full">
          <p className="-mt-14">Cannot load hypotheses</p>
        </div>
      ) : res?.data.hypotheses.length ? (
        res?.data.hypotheses.map((h, idx, _, active = value?.includes(h)) => (
          <div
            key={idx}
            className={[
              "border p-5 rounded-md r cursor-pointer",
              active ? "bg-blue-100 border-blue-500" : "border-gray-300",
            ].join(" ")}
            onClick={() => {
              if (active)
                onChange?.(
                  value?.filter((x) => x.hypothesis != h.hypothesis) || []
                );
              else if (value?.length) onChange?.([...value, h]);
              else onChange?.([h]);
            }}
          >
            <h4>{h.hypothesis}</h4>
            <div className="font-medium space-y-2 mt-5">
              {h.questions.map((q: string, idx: number) => (
                <p key={idx}>
                  Q{idx + 1}: {q}
                </p>
              ))}
            </div>
            {active && (
              <TickIcon
                className="absolute bottom-2 right-2 text-blue-500"
                size={24}
              />
            )}
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
