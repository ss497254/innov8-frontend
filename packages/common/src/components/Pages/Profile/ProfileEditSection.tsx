import React from "react";
import { Button, Input } from "common/src/ui";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "../../../lib/showToast";

interface ProfileEditSectionProps extends React.PropsWithChildren {}

export const ProfileEditSection: React.FC<ProfileEditSectionProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUserStore();
  const { run, loading } = useApi("PUT", `/${user?.role}/profile`);

  return (
    <div className="max-w-6xl mx-auto lg:flex md:py-5">
      <h4 className="lg:w-[35%] mb-6">Personal Information</h4>
      <div className="space-y-6 p-5 md:p-8 lg:w-[65%] bg-white rounded-md shadow-md">
        <Input
          label="First name"
          defaultValue={user?.firstName}
          {...register("firstName")}
        />
        <Input
          label="Last name"
          defaultValue={user?.lastName}
          {...register("lastName")}
        />
        <div className="f justify-end space-x-4 pt-2">
          <Button
            btn="success"
            loading={loading}
            className="w-32"
            onClick={handleSubmit(async (data) => {
              const res = await run({ body: JSON.stringify(data) });
              if (res && res.success)
                showToast(
                  "success",
                  "Profile updated successfully",
                  res.message
                );
              else showToast("error", "Cannot update profile", res.error);
            })}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
