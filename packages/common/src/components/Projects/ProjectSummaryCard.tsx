import { EditIcon } from "common/src/icons";
import { Badge, IconButton, MultiUserAvatar } from "common/src/ui";
import Link from "next/link";
import React from "react";
import { ProjectType } from "../../types";

export interface ProjectSummaryCardProps extends ProjectType {}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  id,
  name,
  elevatorPitch,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4 shadow-md border">
      <div className="f jb ic space-x-4">
        <Link href={`/projects/${id}/review-project`} className="f space-x-3">
          <h4>{name}</h4>
          <Badge type="blue">In progress</Badge>
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
        <IconButton className="!p-1">
          <EditIcon size={22} />
        </IconButton>
      </div>
      <p className="overflow-hidden text-ellipsis leading-5 text-sm">
        {elevatorPitch}
      </p>
    </div>
  );
};
