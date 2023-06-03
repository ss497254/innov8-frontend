import { TrashIcon } from "common/src/icons";
import { Button, IconButton, Textarea } from "common/src/ui";
import React, { useCallback, useRef, useState } from "react";
import { HypothesisQuestion } from "./HypothesisQuestion";

interface props {
  id: number;
  hMap: Map<string, string>;
  onDelete: () => void;
}

export const HypothesisInput: React.FC<props> = ({ id, hMap, onDelete }) => {
  const [questions, setQuestions] = useState([1]);
  const first = id === 1;

  return (
    <div className="p-4 space-y-5 border border-gray-300 rounded-md">
      <Textarea
        label={"Hypothesis " + id}
        onChange={({ target }) => hMap.set("hypothesis", target.value)}
        labelClassName="text-lg font-semibold"
        rows={3}
      />
      {questions.map((id) => (
        <HypothesisQuestion
          key={id}
          id={id}
          onChange={(rule) => {
            hMap.set("question-" + id, rule);
          }}
          onDelete={() => {
            hMap.delete("question-" + id);
            setQuestions(questions.filter((x) => x != id));
          }}
        />
      ))}
      <div className="md:flex space-y-2 md:space-y-0 jb">
        <Button
          className="custom-top-bar"
          onClick={useCallback(() => {
            setQuestions((x) => [...x, x.length + 1]);
          }, [])}
        >
          + Add Question
        </Button>
        {!first && (
          <Button onClick={onDelete} btn="danger">
            <TrashIcon className="mr-2" /> Delete Hypothesis
          </Button>
        )}
      </div>
    </div>
  );
};
