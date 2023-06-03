import React, { useCallback, useState } from "react";
import { Button } from "common/src/ui";
import { HypothesisInput } from "./HypothesisInput";

interface props {
  projectId: string;
}

export const HypothesisGroup: React.FC<props> = () => {
  const [hypotheses, setHypotheses] = useState([1]);

  return (
    <div className="space-y-5 py-4">
      <h2>Hypothesis</h2>
      {hypotheses.map((id) => (
        <HypothesisInput key={id} id={id} />
      ))}
      <Button
        title=""
        className="mb-6 !px-4 !rounded-md relative custom-top-bar"
        onClick={useCallback(() => {
          setHypotheses((x) => [...x, x.length + 1]);
        }, [])}
      >
        + Add Hypothesis
      </Button>
      <Button btn="success" className="w-full !mt-8">
        Submit
      </Button>
    </div>
  );
};
