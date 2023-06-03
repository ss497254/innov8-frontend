import { IconButton, Spinner } from "common";
import { ThreeDotsIcon } from "common/src/icons";
import { ProjectType, ResponseType } from "common/src/types";
import React from "react";
import useSWR from "swr";
import { ProjectCard } from "./ProjectCard";

interface ProjectStageContainerProps extends React.PropsWithChildren {
  name: string;
  color: string;
  url: string;
  edit?: boolean;
  filter?: (x: ProjectType) => boolean;
}

export const ProjectStageContainer: React.FC<ProjectStageContainerProps> = ({
  name,
  color,
  url,
  edit = false,
  filter,
}) => {
  const { data: res, isLoading } = useSWR<ResponseType<ProjectType[]>>(url);

  let projects: ProjectType[] = [];

  if (res?.success && res?.data)
    if (filter) projects = res.data.filter(filter);
    else projects = res.data;

  return (
    <div className="flex-1 p-6 bg-white rounded-md space-y-4">
      <h3 className="f ic mb-6">
        <span className={["rounded mr-3 w-4 h-8", color].join(" ")} />
        {name}
        <span className="flex-1" />
        <IconButton className="!p-2">
          <ThreeDotsIcon />
        </IconButton>
      </h3>
      {isLoading ? (
        <div className="c">
          <Spinner />
        </div>
      ) : projects.length ? (
        projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} edit={edit} />
        )) || (
          <div className="c h-28 !my-auto">
            <p>Cannot load projects</p>
          </div>
        )
      ) : (
        <div className="c h-28 !my-auto">
          <p>No projects</p>
        </div>
      )}
    </div>
  );
};
