import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import { ProjectType, ResponseType } from "common/src/types";
import { Button, FileInput, Input, Textarea } from "common/src/ui";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useSWR from "swr";

interface EditProjectFormProps extends React.PropsWithChildren {}

type FormSubmitType = "draft" | "submit";

export const EditProjectForm: React.FC<EditProjectFormProps> = () => {
  const [submitType, setSubmitType] = useState<"draft" | "submit" | "">("");

  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: res } = useSWR<ResponseType<ProjectType>>(
    query.projectId && `/employee/projects/drafts/${query.projectId}`
  );
  const { run, loading } = useApi("PUT", "/employee/projects/");

  useEffect(() => {
    Object.keys(res?.data || {}).map((key) =>
      //@ts-ignore
      setValue(key, res?.data[key])
    );
  }, [res?.data]);

  const onSubmitProvider = useCallback(
    (type: FormSubmitType) => async (data: FieldValues) => {
      setSubmitType(type);
      const res = await run({
        body: JSON.stringify({ data, type }),
        parameter: query.projectId as string,
      });

      if (res && res.success)
        showToast("success", "Project submitted as " + type, res.message);
      else showToast("error", "Unable to submit project", res.error);
    },
    []
  );

  return (
    <div className="my-4">
      <h3>Edit project form</h3>
      <div className="mt-2 py-4 space-y-6">
        <Input
          label="Project Name"
          labelClassName="!font-bold md:text-lg"
          defaultValue={res?.data.name}
          error={errors.name?.type?.toString()}
          {...register("name", { required: true, value: res?.data.name })}
        />
        <Textarea
          label="Elevator pitch"
          labelClassName="!font-bold md:text-lg"
          desc="Not more than 30 words."
          rows={4}
          defaultValue={res?.data.elevatorPitch}
          error={errors.elevatorPitch?.type?.toString()}
          {...register("elevatorPitch", {
            required: true,
            value: res?.data.elevatorPitch,
          })}
        />
        <Textarea
          label="Summary"
          labelClassName="!font-bold md:text-lg"
          desc="Provide an executive summary of you idea."
          rows={3}
          defaultValue={res?.data.summary}
          error={errors.summary?.type?.toString()}
          {...register("summary", { required: true, value: res?.data.summary })}
        />
        <Textarea
          label="How will you capture value?"
          labelClassName="!font-bold md:text-lg"
          desc="Give an overview of your revenue model."
          rows={4}
          defaultValue={res?.data.captureValue}
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
          defaultValue={res?.data.teamOverview}
          error={errors.slideLink?.type?.toString()}
          {...register("slideLink", { required: true })}
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
