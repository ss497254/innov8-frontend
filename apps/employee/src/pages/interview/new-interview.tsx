import {
  Button,
  Input,
  NextPageWithLayout,
  ProjectType,
  Textarea,
  useUserStore,
} from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "common/src/lib/showToast";
import { useState, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import useSWR from "swr";

const Interview: NextPageWithLayout = () => {
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectType>();
  const { run, loading } = useApi("POST", "/employee/projects");

  const onSubmitProvider = useCallback(async (data: FieldValues) => {
    const res = await run({ body: JSON.stringify({ data }) });

    if (res && res.success)
      showToast("success", "Project submitted as", res.message);
    else showToast("error", "Unable to submit project", res.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
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
        </div>
        <div className="f space-x-4">
          <Button
            btn="success"
            loading={loading}
            className="mx-auto w-full my-4"
            onClick={handleSubmit(onSubmitProvider)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

Interview.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Interview;
