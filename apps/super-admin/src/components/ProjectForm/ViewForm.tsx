import { Textarea } from "common";
import { ProjectFormType } from "common/src/types";
import React from "react";

interface ViewFormProps extends React.PropsWithChildren {
  fields?: ProjectFormType["fields"];
}

export const ViewForm: React.FC<ViewFormProps> = ({ fields }) => {
  return (
    <div className="py-4 md:bg-white md:p-6 lg:p-8 md:shadow-md rounded-md space-y-6">
      <h3>New project form</h3>
      {fields?.map((x, idx) => (
        <Textarea
          key={idx}
          label={x.name}
          desc={x.desc}
          required={x.required}
          labelClassName="!font-bold md:text-lg"
        />
      ))}
    </div>
  );
};
