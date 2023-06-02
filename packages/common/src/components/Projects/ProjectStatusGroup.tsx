import { ThreeDotsIcon } from "common/src/icons";
import { ProjectType, ResponseType } from "common/src/types";
import { Badge, IconButton, Spinner } from "common/src/ui";
import React from "react";
import useSWRImmutable from "swr/immutable";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

interface ProjectStatusGroupProps extends React.PropsWithChildren {
  name: string;
  url: string;
  filter: (x: ProjectType) => boolean;
}

export const ProjectStatusGroup: React.FC<ProjectStatusGroupProps> = ({
  name,
  url,
  filter,
}) => {
  const { data: res, isLoading } =
    useSWRImmutable<ResponseType<ProjectType[]>>(url);

  return (
    <div className="p-6 my-6 space-y-4 bg-white rounded-lg">
      <h4 className="text-2xl f ic">
        {name}
        <Badge type="green" className="mx-2">
          {res?.data.length}
        </Badge>
        <IconButton className="ml-auto">
          <ThreeDotsIcon />
        </IconButton>
      </h4>
      {isLoading ? (
        <div className="c">
          <Spinner />
        </div>
      ) : (
        (res &&
          res.success &&
          res.data
            .filter(filter)
            .map((project, idx) => (
              <ProjectSummaryCard key={idx} {...project} />
            ))) || (
          <div className="c h-20">
            <p>Cannot load projects</p>
          </div>
        )
      )}
    </div>
  );
};
