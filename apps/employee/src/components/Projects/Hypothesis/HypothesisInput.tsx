import { TrashIcon } from "common/src/icons";
import { Button, IconButton, Textarea } from "common/src/ui";
import React, { useCallback, useRef, useState } from "react";
import { HypothesisQuestion } from "./HypothesisQuestion";

interface props {
  id: number;
  hMap: Map<string, string>;
}

export const HypothesisInput: React.FC<props> = ({ id, hMap }) => {
  const [questions, setQuestions] = useState([1]);

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
        {questions.length > 1 && (
          <Button
            btn="outline"
            className="text-red-500 bg-gray-100 hover:bg-red-100"
            onClick={() => {
              const last = questions.length;
              hMap.delete("question-" + last);
              setQuestions(questions.filter((x) => x != last));
            }}
          >
            <TrashIcon className="mr-2" /> Delete Question
          </Button>
        )}
      </div>
    </div>
  );
};
