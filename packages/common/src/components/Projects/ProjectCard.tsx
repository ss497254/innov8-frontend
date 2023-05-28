import { Button, IconButton } from "common/src/ui";
import { EditIcon, CommentsIcon, PaperClipIcon } from "common/src/icons";
import React from "react";
import { ProjectType } from "../../types";

export interface ProjectCardProps extends ProjectType {}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  elevatorPitch,
  files,
  teamMembers,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-4 shadow-md border">
      <div className="f jb ic">
        <h4>{name}</h4>
        <IconButton className="!p-1">
          <EditIcon size={22} />
        </IconButton>
      </div>
      <p className="h-20 overflow-hidden text-ellipsis leading-5 text-sm">
        {elevatorPitch}
      </p>
      <div className="f space-x-2">
        <Button
          size="sm"
          btn="none"
          className="!rounded-full hover:bg-dark-200"
        >
          <PaperClipIcon className="mr-2" />
          {Math.floor(Math.random() * 10)} files
        </Button>

        <Button
          size="sm"
          btn="none"
          className="!rounded-full hover:bg-dark-200"
        >
          <CommentsIcon className="mr-2" />
          {Math.floor(Math.random() * 10)} comments
        </Button>
      </div>
    </div>
  );
};
