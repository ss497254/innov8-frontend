import { Badge, MultiUserAvatar } from "common/src/ui";
import Link from "next/link";
import React from "react";
import { ProjectType } from "../../types";
import { StatusBadgeMap } from "./StatusBadgeType";

export interface ProjectSummaryCardProps extends ProjectType {}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  id,
  name,
  elevatorPitch,
  teamMembers,
  status,
  updatedAt,
}) => {
  return (
    <Link href={`/projects/${id}/${status || ""}`}>
      <div className="bg-white rounded-lg p-6 my-2 space-y-4 shadow-md border">
        <div className="f jb ic space-x-4">
          <h4>{name}</h4>
          <MultiUserAvatar
            size={24}
            className="!ml-auto mr-3"
            srcArray={teamMembers?.map((user) => user.avatarUrl) || []}
          />
        </div>
        <p className="overflow-hidden text-ellipsis leading-5 text-sm">
          {elevatorPitch}
        </p>
        <div className="f space-x-2">
          {status && <Badge type={StatusBadgeMap[status]}>{status}</Badge>}
          <div className="flex-1 text-right">
            {new Date(updatedAt).toDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};
