import { IconButton, Input } from "common";
import { TrashIcon } from "common/src/icons";
import React from "react";

interface props {
  id: number;
  value?: string;
  onChange?: (x: string) => void;
}

export const HypothesisQuestion: React.FC<props> = ({
  id,
  onChange,
  value,
}) => {
  return (
    <div className="space-y-4 f items-end">
      <Input
        value={value}
        containerClassName="w-full"
        onChange={(e) => onChange?.(e.target.value)}
        label={"Question " + id}
      />
    </div>
  );
};
