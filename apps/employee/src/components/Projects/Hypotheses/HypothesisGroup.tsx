import React, { useCallback, useRef, useState } from "react";
import { Button } from "common/src/ui";
import { HypothesisInput } from "./HypothesisInput";
import { useApi } from "common/src/hooks/useApi";
import { TrashIcon } from "common/src/icons";
import { showToast } from "common/src/lib/showToast";

interface props {
  projectId: string;
}

export const HypothesisGroup: React.FC<props> = ({ projectId }) => {
  const [hypotheses, setHypotheses] = useState([1]);
  const { loading, run } = useApi("POST", "/employee/hypotheses/" + projectId);
  const mp = useRef(
    new Map<number, Map<number | string, string>>().set(1, new Map())
  );

  const addHypothesis = useCallback(() => {
    setHypotheses((x) => {
      mp.current.set(x.length + 1, new Map());
      return [...x, x.length + 1];
    });
  }, []);

  if (!projectId) return null;

  return (
    <div className="space-y-5 py-4">
      <h2>Hypothesis</h2>
      {hypotheses.map((id) => (
        <HypothesisInput key={id} id={id} hMap={mp.current.get(id)!} />
      ))}
      <div className="md:flex space-y-2 md:space-y-0 jb">
        <Button
          className="!px-4 !rounded-md relative custom-top-bar"
          onClick={addHypothesis}
        >
          + Add Hypothesis
        </Button>
        {hypotheses.length > 1 && (
          <Button
            btn="danger"
            onClick={() => {
              const last = hypotheses.length;
              mp.current.delete(last);
              setHypotheses(hypotheses.filter((x) => x != last));
            }}
          >
            <TrashIcon className="mr-2" /> Delete Hypothesis
          </Button>
        )}
      </div>
      <Button
        btn="success"
        className="w-full !mt-8"
        loading={loading}
        onClick={async () => {
          const hypotheses = [...mp.current.values()]
            .filter((x) => x.get("hypothesis"))
            .map((x) => {
              const questions: string[] = [];

              for (let [key, value] of x) {
                if (key !== "hypothesis" && value) questions.push(value);
              }
              return { questions, hypothesis: x.get("hypothesis") };
            });

          const res = await run({
            body: JSON.stringify({ hypotheses }),
          });
          if (res && res.success)
            showToast("success", "Hypothesis added successfully", res.message);
          else showToast("error", "Unable to add Hypothesis", res.error);
        }}
      >
        Submit
      </Button>
    </div>
  );
};
