import React, { useCallback, useRef, useState } from "react";
import { Button } from "common/src/ui";
import { HypothesisInput } from "./HypothesisInput";
import { useApi } from "common/src/hooks/useApi";

interface props {
  projectId: string;
}

export const HypothesisGroup: React.FC<props> = () => {
  const [hypotheses, setHypotheses] = useState([1]);
  const { loading, run } = useApi("POST", "/employee/hypothesis");
  const mp = useRef(new Map<number, Map<string, string>>().set(1, new Map()));

  return (
    <div className="space-y-5 py-4">
      <h2>Hypothesis</h2>
      {hypotheses.map((id) => (
        <HypothesisInput key={id} id={id} hMap={mp.current.get(id)!} />
      ))}
      <Button
        title=""
        className="mb-6 !px-4 !rounded-md relative custom-top-bar"
        onClick={useCallback(() => {
          setHypotheses((x) => {
            mp.current.set(x.length + 1, new Map());
            return [...x, x.length + 1];
          });
        }, [])}
      >
        + Add Hypothesis
      </Button>
      <Button
        btn="success"
        className="w-full !mt-8"
        loading={loading}
        onClick={async () => {
          const data = [...mp.current.values()].map((x) => {
            const h: Record<string, string> = {};
            for (let [key, value] of x) {
              h[key] = value;
            }
            return h;
          });

          console.log(data);

          const res = await run();
        }}
      >
        Submit
      </Button>
    </div>
  );
};
