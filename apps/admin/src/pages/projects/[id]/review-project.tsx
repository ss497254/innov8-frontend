import { NextPageWithLayout } from "common";
import { Button, Input, Textarea } from "common/src/ui";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const ReviewProject: NextPageWithLayout = () => {
  return (
    <div className="max-w-6xl rounded-md mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-md shadow-xl p-6 md:p-8 space-y-6">
        <h3>Project Review</h3>
        <Input
          disabled
          value="Illustration of onboarding"
          label="Project Name"
          labelClassName="md:text-lg"
        />
        <Textarea
          disabled
          label="Elevator pitch"
          labelClassName="md:text-lg"
          rows={4}
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quis, magnam nihil modi accusamus aliquid ipsam eum impedit delectus cumque dolore officia, odit odio minus nobis voluptatum nisi vero porro"
        />
        <Textarea
          disabled
          label="Summary"
          labelClassName="md:text-lg"
          rows={4}
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quis, magnam nihil modi accusamus aliquid ipsam eum impedit delectus cumque dolore officia, odit odio minus nobis voluptatum nisi vero porro"
        />
        <Textarea
          disabled
          label="How will you capture value?"
          labelClassName="md:text-lg"
          rows={4}
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quis, magnam nihil modi accusamus aliquid ipsam eum impedit delectus cumque dolore officia, odit odio minus nobis voluptatum nisi vero porro"
        />
        <Textarea
          disabled
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="md:text-lg"
          rows={4}
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quis, magnam nihil modi accusamus aliquid ipsam eum impedit delectus cumque dolore officia, odit odio minus nobis voluptatum nisi vero porro"
        />
        <Textarea
          disabled
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="md:text-lg"
          rows={4}
          value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quis, magnam nihil modi accusamus aliquid ipsam eum impedit delectus cumque dolore officia, odit odio minus nobis voluptatum nisi vero porro"
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
        <h4>Assign Judge</h4>
        <div className="my-8">
          <Input label="Judge email" />
        </div>
        <div className="f space-x-4 justify-end">
          <Button btn="danger">Cancel</Button>
          <Button btn="success">Save</Button>
        </div>
      </div>
    </div>
  );
};

ReviewProject.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ReviewProject;
