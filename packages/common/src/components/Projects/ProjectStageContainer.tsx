import { IconButton, Spinner } from "common";
import { ThreeDotsIcon } from "common/src/icons";
import { ProjectType, ResponseType } from "common/src/types";
import React from "react";
import useSWRImmutable from "swr/immutable";
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
  const { data: res, isLoading } =
    useSWRImmutable<ResponseType<ProjectType[]>>(url);

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
      ) : (
        (res &&
          res.success &&
          (filter ? res.data.filter(filter) : res.data).map((project, idx) => (
            <ProjectCard key={idx} {...project} edit={edit} />
          ))) || (
          <div className="c h-28 !my-auto">
            <p>Cannot load projects</p>
          </div>
        )
      )}
    </div>
  );
};
