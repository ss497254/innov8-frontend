import { Badge, BadgeTypes, MultiUserAvatar } from "common/src/ui";
import Link from "next/link";
import React from "react";
import { ProjectType } from "../../types";

export interface ProjectSummaryCardProps extends ProjectType {}

const StatusBadgeMap: Record<
  Exclude<ProjectType["status"], undefined>,
  keyof typeof BadgeTypes
> = {
  "admin-review": "blue",
  "judge-review": "purple",
  "rating-completed": "green",
};

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  id,
  name,
  elevatorPitch,
  teamMembers,
  status,
}) => {
  return (
    <Link href={`/projects/${id}/${status}`}>
      <div className="bg-white rounded-lg p-6 my-2 space-y-4 shadow-md border">
        <div className="f jb ic space-x-4">
          <h4>{name}</h4>
          {status && <Badge type={StatusBadgeMap[status]}>{status}</Badge>}
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
