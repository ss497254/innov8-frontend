import { Button, Textarea } from "common/src/ui";
import React, { useCallback, useRef, useState } from "react";
import { HypothesisQuestion } from "./HypothesisQuestion";

interface props {
  id: number;
}

export const HypothesisInput: React.FC<props> = ({ id }) => {
  const [questions, setQuestions] = useState([1]);
  const rules = useRef(new Map());

  return (
    <div className="p-4 space-y-5 border border-gray-300 rounded-md">
      <Textarea
        label={"Hypothesis " + id}
        labelClassName="text-xl font-semibold"
        rows={3}
      />
      {questions.map((id) => (
        <HypothesisQuestion
          key={id}
          id={id}
          onChange={(rule) => {
            rules.current.set(id, rule);
          }}
          onDelete={() => setQuestions(questions.filter((x) => x != id))}
        />
      ))}
      <Button
        className="custom-top-bar"
        onClick={useCallback(() => {
          setQuestions((x) => [...x, x.length + 1]);
        }, [])}
      >
        + Add Question
      </Button>
    </div>
  );
};
