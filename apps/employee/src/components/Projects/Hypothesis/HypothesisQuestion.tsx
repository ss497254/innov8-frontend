import { IconButton, Input } from "common";
import { EditIcon } from "common/src/icons";
import React from "react";

interface props {
  id: number;
  onDelete?: () => void;
  value?: string;
  onChange?: (x: string) => void;
}

export const HypothesisQuestion: React.FC<props> = ({
  id,
  onDelete,
  onChange,
  value,
}) => {
  const first = id === 1;

  return (
    <div className="space-y-4 f items-end">
      <Input
        value={value}
        containerClassName="w-full"
        onChange={(e) => onChange?.(e.target.value)}
        label={"Question " + id}
      />
      {first ? (
        <div className="w-14" />
      ) : (
        <IconButton
          onClick={onDelete}
          className="!p-2.5 ml-2.5 hover:bg-red-200 text-red-500"
        >
          <EditIcon size={22} />
        </IconButton>
      )}
    </div>
  );
};
