import { MultiUserAvatar } from "common/src/ui";
import { Avatar } from "common/src/ui/User";
import Link from "next/link";
import React from "react";
import { InterviewType } from "../../types";

export interface InterviewSummaryCardProps extends InterviewType {}

export const InterviewSummaryCard: React.FC<InterviewSummaryCardProps> = ({
  id,
  teamMembers,
  updatedAt,
  interviewTitle,
  coach,
}) => {
  return (
    <Link href={`/interviews/${id}`}>
      <div className="bg-white rounded-lg p-6 my-2 space-y-4 shadow-md border">
        <div className="f jb ic space-x-4">
          <h4>{interviewTitle}</h4>
          <MultiUserAvatar
            size={24}
            className="!ml-auto mr-3"
            srcArray={teamMembers?.map((user) => user.avatarUrl) || []}
          />
        </div>
        <div className="f space-x-2 items-end">
          <Avatar src={coach?.avatarUrl} size={40} />
          <div className="flex-1 text-right">
            {new Date(updatedAt).toDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};
