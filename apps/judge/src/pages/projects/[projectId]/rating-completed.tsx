import {
  NextPageWithLayout,
  ProjectType,
  ResponseType,
} from "common/src/types";
import { ProjectField, StarRating } from "common/src/ui";
import { useRouter } from "next/router";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWR from "swr";

const RatingCompleted: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: res } = useSWR<ResponseType<ProjectType>>(
    query.projectId && `/judge/projects/${query.projectId}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <ProjectField heading="Project Name" headingClassName="md:text-lg">
          {res?.data.name}
        </ProjectField>
        <ProjectField heading="Elevator pitch" headingClassName="md:text-lg">
          {res?.data.elevatorPitch}
        </ProjectField>
        <StarRating
          value={res?.data.rating?.elevatorPitch}
          className="mx-auto scale-75 !mt-1"
        />
        <ProjectField heading="Summary" headingClassName="md:text-lg">
          {res?.data.summary}
        </ProjectField>
        <StarRating
          value={res?.data.rating?.summary}
          className="mx-auto scale-75 !mt-1"
        />
        <ProjectField
          heading="How will you capture value?"
          headingClassName="md:text-lg"
        >
          {res?.data.captureValue}
        </ProjectField>
        <StarRating
          value={res?.data.rating?.captureValue}
          className="mx-auto scale-75 !mt-1"
        />
        <ProjectField
          heading="Do you have the competencies within your team to build the MVP?"
          headingClassName="md:text-lg"
        >
          {res?.data.teamOverview}
        </ProjectField>
        <StarRating
          value={res?.data.rating?.teamOverview}
          className="mx-auto scale-75 !mt-1"
        />
        <ProjectField
          heading="Please edit and finalize your pitch deck using the template"
          headingClassName="md:text-lg"
        >
          {res?.data.slideLink}
        </ProjectField>
        <StarRating
          value={res?.data.rating?.slideLink}
          className="mx-auto scale-75 !mt-1"
        />
        <div className="border rounded-md p-5 space-y-4">
          <h4>Overall Rating</h4>
          <StarRating value={res?.data.overallRating} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

RatingCompleted.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default RatingCompleted;
