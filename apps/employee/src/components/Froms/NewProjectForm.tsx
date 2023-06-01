import { useApi } from "common/src/hooks/useApi";
import { TeamMemberInput } from "common/src/components";
import { showToast } from "common/src/lib/showToast";
import { Button, Textarea, FileInput, Input } from "common/src/ui";
import React, { useCallback, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

interface NewProjectFormProps extends React.PropsWithChildren {}

type FormSubmitType = "draft" | "submit";

export const NewProjectForm: React.FC<NewProjectFormProps> = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [submitType, setSubmitType] = useState<"draft" | "submit" | "">("");
  const { run, loading } = useApi("POST", "/employee/projects");

  const onSubmitProvider = useCallback(
    (type: FormSubmitType) => async (data: FieldValues) => {
      setSubmitType(type);
      const res = await run({ body: JSON.stringify({ data, type }) });

      if (res && res.success)
        showToast("success", "Project submitted as " + type, res.message);
      else showToast("error", "Unable to submit project", res.error);
    },
    []
  );

  return (
    <div className="my-4 md:bg-white md:rounded-md md:shadow-xl md:p-8">
      <h3>New project form</h3>
      <div className="mt-2 py-4 space-y-6">
        <Input
          label="Project Name"
          labelClassName="!font-bold md:text-lg"
          error={errors.name?.type?.toString()}
          {...register("name", { required: true })}
        />
        <Textarea
          label="Elevator pitch"
          labelClassName="!font-bold md:text-lg"
          desc="Not more than 30 words."
          rows={4}
          error={errors.elevatorPitch?.type?.toString()}
          {...register("elevatorPitch", { required: true })}
        />
        <Textarea
          label="Summary"
          labelClassName="!font-bold md:text-lg"
          desc="Provide an executive summary of you idea."
          rows={3}
          error={errors.summary?.type?.toString()}
          {...register("summary", { required: true })}
        />
        <Textarea
          label="How will you capture value?"
          labelClassName="!font-bold md:text-lg"
          desc="Give an overview of your revenue model."
          rows={4}
          error={errors.captureValue?.type?.toString()}
          {...register("captureValue", { required: true })}
        />
        <Textarea
          label="Do you have the competencies within your team to build the MVP?"
          labelClassName="!font-bold md:text-lg"
          desc="Give an overview of your team and what you might need help with."
          rows={4}
          error={errors.teamOverview?.type?.toString()}
          {...register("teamOverview", { required: true })}
        />
        <Textarea
          label="Please edit and finalize your pitch deck using the template"
          labelClassName="!font-bold md:text-lg"
          desc="www.slides.api"
          rows={4}
          error={errors.slideLink?.type?.toString()}
          {...register("slideLink", { required: true })}
        />
        <TeamMemberInput
          label="Team Members"
          labelClassName="!font-bold md:text-lg"
          desc="You can add upto 3 team members."
          onChange={(e) => setValue("teamMembers", e)}
        />
        <FileInput
          label="Attachments"
          labelClassName="!font-bold md:text-lg"
          desc="Any supporting documents, pitch deck, etc."
        />
      </div>
      <div className="f space-x-4">
        <Button
          loading={submitType === "draft" && loading}
          className="mx-auto w-full my-4"
          onClick={handleSubmit(onSubmitProvider("draft"))}
        >
          Save as draft
        </Button>
        <Button
          btn="success"
          loading={submitType === "submit" && loading}
          className="mx-auto w-full my-4"
          onClick={handleSubmit(onSubmitProvider("submit"))}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
