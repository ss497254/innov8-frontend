import { Button, Textarea } from "common";
import React from "react";

interface ProjectFormProps extends React.PropsWithChildren {}

export const ProjectForm: React.FC<ProjectFormProps> = () => {
  return (
    <div className="space-y-4 lg:w-[650px]">
      <h3></h3>
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
      <div className="f space-x-5">
        <div className="flex-1" />
        <Button btn="none" className="!text-red-500 hover:bg-red-100">
          Cancel
        </Button>
        <Button btn="success">Submit</Button>
      </div>
    </div>
  );
};
