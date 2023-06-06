import { Button, NextPageWithLayout, ProjectType } from "common";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import { Avatar } from "common/src/ui/User";
import { useCallback, useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { ProjectNameInput } from "src/components/Projects/ProjectNameInput";
import { HypothesisTable } from "src/components/Projects/Hypotheses";

const Interview: NextPageWithLayout = () => {
  const [hypothesis, setHypothesis] = useState([]);

  const [project, setProject] = useState<ProjectType>();
  const { run, loading } = useApi("POST", "/employee/interview");

  const onSubmitProvider = useCallback(async () => {
    const res = await run({
      body: JSON.stringify({ hypothesis, id: project?.id, ...project }),
    });

    if (res && res.success)
      showToast("success", "Project submitted as", res.message);
    else showToast("error", "Unable to submit project", res.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <div className="my-4 md:bg-white md:rounded-md md:shadow-xl md:p-8">
        <h1>New project form</h1>
        <div className="mt-2 py-4 space-y-6">
          <ProjectNameInput onChange={setProject} value={project} />
          {project && (
            <>
              <h4>Coach</h4>
              <h3 className="f ic !mt-2">
                <Avatar
                  size={50}
                  src={project.coach?.avatarUrl}
                  className="mr-4"
                />
                {project.coach?.firstName + " " + project.coach?.lastName}
              </h3>
              <div className="!-mb-6 font-semibold text-lg">Team Members</div>
              <div className="f jb items-end">
                <div className="f">
                  {project.teamMembers?.map((member, idx) => (
                    <Avatar
                      size={40}
                      key={idx}
                      className="mt-2"
                      src={member.avatarUrl}
                    />
                  ))}
                </div>
                <h4 className="text-lg">
                  {project.updatedAt &&
                    new Date(project.updatedAt).toDateString()}
                </h4>
              </div>
              <HypothesisTable
                projectId={project.id}
                value={hypothesis}
                onChange={setHypothesis}
                desc="Click on Hypothesis to select"
              />
            </>
          )}
        </div>
        <div className="f space-x-4">
          {project && (
            <Button
              btn="success"
              loading={loading}
              className="mx-auto w-full my-4"
              onClick={onSubmitProvider}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Interview.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Interview;
