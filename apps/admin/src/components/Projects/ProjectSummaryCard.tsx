import { EditIcon } from "common/src/icons";
import { IconButton, MultiUserAvatar } from "common/src/ui";
import Link from "next/link";
import React, { useState } from "react";
import { AssignJudgeModal } from "./AssignJudgeModal";

export interface ProjectSummaryCardProps extends React.PropsWithChildren {
  title: string;
  desc: string;
  employees: any[];
}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  title,
  desc,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 shadow-md border">
      <AssignJudgeModal open={open} onClose={() => setOpen(false)} />
      <div className="f jb ic space-x-4">
        <Link href="#">
          <h4>{title}</h4>
        </Link>
        <MultiUserAvatar
          size={24}
          className="!ml-auto mr-3"
          srcArray={[
            "https://xsgames.co/randomusers/assets/avatars/male/36.jpg",
            "https://xsgames.co/randomusers/assets/avatars/male/37.jpg",
            "https://xsgames.co/randomusers/assets/avatars/male/38.jpg",
          ]}
        />
        <IconButton className="!p-1" onClick={() => setOpen(true)}>
          <EditIcon size={22} />
        </IconButton>
      </div>
      <p className="overflow-hidden text-ellipsis leading-5 text-sm">{desc}</p>
    </div>
  );
};
