import { Button, Textarea, FileInput, Input } from "common/src/ui";
import React from "react";

interface ProjectFormProps extends React.PropsWithChildren {}

export const ProjectForm: React.FC<ProjectFormProps> = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3>New project form</h3>
      <div className="mt-2 py-4 space-y-6">
        <Input label="Project Name" labelClassName="!font-bold md:text-lg" />
        <Textarea
          label="Elevator pitch"
          labelClassName="!font-bold md:text-lg"
          desc="Not more than 30 words."
          rows={4}
        />
        <Textarea
          label="Summary"
          labelClassName="!font-bold md:text-lg"
          desc="Provide an executive summary of you idea."
          rows={3}
        />
        <Textarea
          label="How will you capture value?"
          labelClassName="!font-bold md:text-lg"
          desc="Give an overview of your revenue model."
          rows={4}
        />
        <Textarea
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="!font-bold md:text-lg"
          desc="Give an overview of your team and what you might need help with."
          rows={4}
        />
        <Textarea
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="!font-bold md:text-lg"
          desc="www.slides.api"
          rows={4}
        />
        <FileInput
          label="Attachments"
          labelClassName="!font-bold md:text-lg"
          desc="Any supporting documents, pitch deck, etc."
        />
      </div>
      <Button btn="success" className="mx-auto w-full my-4">
        Submit
      </Button>
    </div>
  );
};
