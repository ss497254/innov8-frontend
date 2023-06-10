import { MultiUserAvatar, Spinner, TabButtons } from "common";
import { PageTopBar } from "common/src/components";
import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { Avatar } from "common/src/ui/User";
import Link from "next/link";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

const tabs = ["New", "Completed"];

const Projects: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: res, isLoading } = useSWR<ResponseType<ProjectType[]>>(
    "/employee/hypotheses/projects"
  );

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Hypotheses">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      <div className="my-6 space-y-4">
        {isLoading ? (
          <div className="c">
            <Spinner />
          </div>
        ) : (
          (res &&
            res.success &&
            res.data.map((project, idx) => (
              <Link href={`/hypotheses/${project.id}`}>
                <div className="bg-white rounded-lg p-6 my-2 space-y-4 shadow-md border">
                  <div className="f jb ic space-x-4">
                    <h4>{project.name}</h4>
                    <MultiUserAvatar
                      size={24}
                      className="!ml-auto mr-3"
                      srcArray={
                        project.teamMembers?.map((user) => user.avatarUrl) || []
                      }
                    />
                  </div>
                  <p className="overflow-hidden text-ellipsis leading-5 text-sm">
                    {project.elevatorPitch}
                  </p>
                  <div className="f space-x-2 items-end">
                    <Avatar src={project.coach?.avatarUrl} size={40} />
                    <div className="flex-1 text-right">
                      {new Date(project.updatedAt).toDateString()}
                    </div>
                  </div>
                </div>
              </Link>
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
