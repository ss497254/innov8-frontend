import { NextPageWithLayout, ProjectType, ResponseType } from "common";
import { Button, Input, StarRating, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import useSWRImmutable from "swr/immutable";

const ReviewProject: NextPageWithLayout = () => {
  const [value, setValue] = useState(0);
  const { query } = useRouter();

  const { data: res, isLoading } = useSWRImmutable<ResponseType<ProjectType>>(
    query.id && `/employee/projects/${query.id}`
  );

  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <Input
          disabled
          value={res?.data.name}
          label="Project Name"
          labelClassName="md:text-lg"
        />
        <Textarea
          disabled
          label="Elevator pitch"
          labelClassName="md:text-lg"
          rows={4}
          value={res?.data.elevatorPitch}
        />
        <Textarea
          disabled
          label="Summary"
          labelClassName="md:text-lg"
          rows={4}
          value={res?.data.summary}
        />
        <Textarea
          disabled
          label="How will you capture value?"
          labelClassName="md:text-lg"
          rows={4}
          value={res?.data.teamOverview}
        />
        <Textarea
          disabled
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="md:text-lg"
          rows={4}
          value={res?.data.teamOverview}
        />
        <Textarea
          disabled
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="md:text-lg"
          rows={4}
          value={res?.data.files?.join(", ")}
        />
        <div className="space-y-2">
          <div className="md:text-lg font-medium text-gray-900">
            Attachments
          </div>
          <a href="#" className="text-blue-500 block font-semibold">
            Slides.pptx
          </a>
          <a href="#" className="text-blue-500 block font-semibold">
            Document.docs
          </a>
        </div>
        <div className="cc space-y-4">
          <h4>Your review</h4>
          <StarRating value={value} setValue={setValue} />
        </div>
        <div className="f space-x-4">
          <Button className="mx-auto w-full my-4">Save as draft</Button>
          <Button btn="success" className="mx-auto w-full my-4">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

ReviewProject.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ReviewProject;
