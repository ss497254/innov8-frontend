import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { ProjectSummaryCard } from "common/src/components";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectsTopBar } from "src/components/Projects/ProjectsTopBar";
import useSWR from "swr";
import { Spinner } from "common";

const tabs = ["In progress", "Completed"];

const Projects: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: res, isLoading } =
    useSWR<ResponseType<ProjectType[]>>("/judge/projects");

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <ProjectsTopBar
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="my-6 space-y-4">
        {isLoading ? (
          <div className="c">
            <Spinner />
          </div>
        ) : (
          (res &&
            res.success &&
            res.data.map((project, idx) => (
              <ProjectSummaryCard key={idx} {...project} />
            ))) || (
            <div className="c h-20">
              <p>Cannot load projects</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

Projects.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Projects;
