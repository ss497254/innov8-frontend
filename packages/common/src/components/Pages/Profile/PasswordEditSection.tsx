import React from "react";
import { Button, PasswordInput } from "common/src/ui";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "../../../lib/showToast";

interface PasswordEditSectionProps extends React.PropsWithChildren {}

export const PasswordEditSection: React.FC<PasswordEditSectionProps> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useUserStore();
  const { run, loading } = useApi("PUT", `/${user?.role}/password`);

  return (
    <div className="max-w-6xl mx-auto lg:flex md:py-5">
      <h4 className="lg:w-[35%] mb-6">Change Password</h4>
      <div className="space-y-6 p-5 md:p-8 lg:w-[65%] bg-white rounded-md shadow-md">
        <PasswordInput
          label="Old Password"
          error={errors.password?.type?.toString()}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password should be of 8 characters",
            },
          })}
        />
        <PasswordInput
          label="New Password"
          error={errors.newPassword?.type?.toString()}
          {...register("newPassword", {
            required: true,
            minLength: {
              value: 8,
              message: "Password should be of 8 characters",
            },
          })}
        />
        <PasswordInput
          label="Confirm New Password"
          error={errors.confirmNewPassword?.type?.toString()}
          {...register("confirmNewPassword", {
            required: true,
            minLength: {
              value: 8,
              message: "Password should be of 8 characters",
            },
          })}
        />
        <div className="f justify-end space-x-4 pt-2">
          <Button
            btn="success"
            loading={loading}
            className="w-32"
            onClick={handleSubmit(async (data) => {
              if (data.confirmNewPassword !== data.newPassword)
                return showToast(
                  "error",
                  "New password and confirm password are not same."
                );

              const res = await run({ body: JSON.stringify(data) });
              if (res && res.success)
                showToast(
                  "success",
                  "Password updated successfully",
                  res.message
                );
              else showToast("error", "Cannot update password", res.error);
            })}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
