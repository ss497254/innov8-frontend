import { ThreeDotsIcon } from "common/src/icons";
import { InterviewType, ResponseType } from "common/src/types";
import { Badge, IconButton, Spinner } from "common/src/ui";
import React from "react";
import useSWR from "swr";
import { InterviewSummaryCard } from "./InterviewSummaryCard";

interface InterviewsTableProps extends React.PropsWithChildren {
  name: string;
  url: string;
  filter?: (x: InterviewType) => boolean;
}

export const InterviewsTable: React.FC<InterviewsTableProps> = ({
  name,
  url,
  filter,
}) => {
  const { data: res, isLoading } = useSWR<ResponseType<InterviewType[]>>(url);

  let interviews: InterviewType[] = [];

  if (res?.success && res?.data)
    if (filter) interviews = res.data.filter(filter);
    else interviews = res.data;

  return (
    <div className="p-6 my-6 space-y-4 bg-white rounded-lg">
      <h4 className="text-2xl f ic">
        {name}
        {interviews.length > 0 && (
          <Badge type="green" className="mx-2">
            {interviews.length}
          </Badge>
        )}
        <IconButton className="ml-auto">
          <ThreeDotsIcon />
        </IconButton>
      </h4>
      {isLoading ? (
        <div className="c">
          <Spinner />
        </div>
      ) : interviews.length ? (
        interviews.map((interview, idx) => (
          <InterviewSummaryCard key={idx} {...interview} />
        ))
      ) : (
        <div className="c h-20">
          <p>No interviews</p>
        </div>
      )}
    </div>
  );
};
