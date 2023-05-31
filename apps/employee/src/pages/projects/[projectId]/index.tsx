import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { Input, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWRImmutable from "swr/immutable";

const ProjectView: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: res, isLoading } = useSWRImmutable<ResponseType<ProjectType>>(
    query.projectId && `/employee/projects/${query.projectId}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <Input
          disabled
          defaultValue={res?.data.name}
          label="Project Name"
          labelClassName="md:text-lg"
        />
        <Textarea
          disabled
          label="Elevator pitch"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.elevatorPitch}
        />
        <Textarea
          disabled
          label="Summary"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.summary}
        />
        <Textarea
          disabled
          label="How will you capture value?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.captureValue}
        />
        <Textarea
          disabled
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.teamOverview}
        />
        <Textarea
          disabled
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="md:text-lg"
          rows={4}
          defaultValue={res?.data.files}
        />
      </div>
    </div>
  );
};

ProjectView.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ProjectView;
