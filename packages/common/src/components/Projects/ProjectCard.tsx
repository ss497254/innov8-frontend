import { EditIcon, FullscreenIcon } from "common/src/icons";
import { Badge, IconButton } from "common/src/ui";
import Link from "next/link";
import React from "react";
import { ProjectType } from "../../types";
import { StatusBadgeMap } from "./StatusBadgeType";

export interface ProjectCardProps extends ProjectType {
  edit?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  elevatorPitch,
  edit,
  updateAt,
  status,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-4 shadow-md border">
      <div className="f jb ic">
        <h4>{name}</h4>
        {edit ? (
          <Link href={`/projects/${id}/edit-project`}>
            <IconButton className="!p-1">
              <EditIcon size={22} />
            </IconButton>
          </Link>
        ) : (
          <Link href={`/projects/${id}/${status}`}>
            <IconButton className="!p-2">
              <FullscreenIcon size={14} />
            </IconButton>
          </Link>
        )}
      </div>
      <p className="h-20 overflow-hidden text-ellipsis leading-5 text-sm">
        {elevatorPitch}
      </p>
      <div className="f space-x-2">
        {status && <Badge type={StatusBadgeMap[status]}>{status}</Badge>}
        <div className="flex-1 text-right">
          {new Date(updateAt * 1000).toDateString()}
        </div>
      </div>
    </div>
  );
};
