import { Badge, MultiUserAvatar } from "common/src/ui";
import Link from "next/link";
import React from "react";
import { ProjectType } from "../../types";

export interface ProjectSummaryCardProps extends ProjectType {}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  id,
  name,
  elevatorPitch,
  teamMembers,
  status,
}) => {
  return (
    <Link href={`/projects/${id}/${status ? "" : "review-project"}`}>
      <div className="bg-white rounded-lg p-6 my-2 space-y-4 shadow-md border">
        <div className="f jb ic space-x-4">
          <h4>{name}</h4>
          <Badge type="blue">In progress</Badge>
          <MultiUserAvatar
            size={24}
            className="!ml-auto mr-3"
            srcArray={teamMembers?.map((user) => user.avatarUrl) || []}
          />
        </div>
        <p className="overflow-hidden text-ellipsis leading-5 text-sm">
          {elevatorPitch}
        </p>
      </div>
    </Link>
  );
};
