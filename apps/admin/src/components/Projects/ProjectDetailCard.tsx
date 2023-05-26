import { Button, IconButton } from "common/src/ui";
import { EditIcon, CommentsIcon, PaperClipIcon } from "common/src/icons";
import React from "react";
import Link from "next/link";

export interface ProjectDetailCardProps extends React.PropsWithChildren {
  title: string;
  desc: string;
  files: number;
  comments: number;
}

export const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  title,
  desc,
  files,
  comments,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4 shadow-md border">
      <div className="f jb ic">
        <Link href="#">
          <h4>{title}</h4>
        </Link>
        <IconButton className="!p-1">
          <EditIcon size={22} />
        </IconButton>
      </div>
      <p className="h-20 overflow-hidden text-ellipsis leading-5 text-sm">
        {desc}
      </p>
      <div className="f space-x-2 ic">
        <Button
          size="sm"
          btn="none"
          className="!rounded-full hover:bg-dark-200"
        >
          <PaperClipIcon className="mr-2" />
          {files} files
        </Button>

        <Button
          size="sm"
          btn="none"
          className="!rounded-full hover:bg-dark-200"
        >
          <CommentsIcon className="mr-2" />
          {comments} comments
        </Button>
        <div className="text-sm font-medium text-right flex-1">
          {new Date().toDateString()}
        </div>
      </div>
    </div>
  );
};
