import { Textarea } from "common";
import React from "react";

interface ProjectFormProps extends React.PropsWithChildren {}

export const ProjectForm: React.FC<ProjectFormProps> = () => {
  return (
    <div className="">
      <Textarea label="Summary" />
      <Textarea label="How will you capture value?" />
      <Textarea label="Do you have the competencies within your team to build the MVP?" />
    </div>
  );
};
