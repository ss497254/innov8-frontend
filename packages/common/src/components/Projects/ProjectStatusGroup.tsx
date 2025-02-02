import { ThreeDotsIcon } from "common/src/icons";
import { ProjectType, ResponseType } from "common/src/types";
import { Badge, IconButton, Spinner } from "common/src/ui";
import React from "react";
import useSWR from "swr";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

interface ProjectStatusGroupProps extends React.PropsWithChildren {
  name: string;
  url: string;
  filter?: (x: ProjectType) => boolean;
}

export const ProjectStatusGroup: React.FC<ProjectStatusGroupProps> = ({
  name,
  url,
  filter,
}) => {
  const { data: res, isLoading } = useSWR<ResponseType<ProjectType[]>>(url);

  let projects: ProjectType[] = [];

  if (res?.success && res?.data)
    if (filter) projects = res.data.filter(filter);
    else projects = res.data;

  return (
    <div className="p-6 my-6 space-y-4 bg-white rounded-lg">
      <h4 className="text-2xl f ic">
        {name}
        {projects.length > 0 && (
          <Badge type="green" className="mx-2">
            {projects.length}
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
      ) : projects.length ? (
        projects.map((project, idx) => (
          <ProjectSummaryCard key={idx} {...project} />
        ))
      ) : (
        <div className="c h-20">
          <p>No projects</p>
        </div>
      )}
    </div>
  );
};
