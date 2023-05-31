import React from "react";
import { Button, PasswordInput } from "common/src/ui";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../../stores";
import { useApi } from "common/src/hooks/useApi";
import { showToast } from "../../../lib/showToast";
import * as yup from "yup";
import { useValidation } from "../../../hooks/useValidation";

const validationSchema = yup.object({
  Password: yup.string().required("Required").min(8),
  "New Password": yup.string().required("Required").min(8),
  "Confirm New Password": yup.string().required("Required").min(8),
});

interface PasswordEditSectionProps extends React.PropsWithChildren {}

export const PasswordEditSection: React.FC<PasswordEditSectionProps> = () => {
  const resolver = useValidation(validationSchema);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver });
  const { user } = useUserStore();
  const { run, loading } = useApi("PUT", `/${user?.role}/password`);

  return (
    <div className="max-w-6xl mx-auto lg:flex md:py-5">
      <h4 className="lg:w-[35%] mb-6">Change Password</h4>
      <div className="space-y-6 p-5 md:p-8 lg:w-[65%] bg-white rounded-md shadow-md">
        <PasswordInput
          label="Old Password"
          error={errors.Password?.message?.toString()}
          {...register("Password")}
        />
        <PasswordInput
          label="New Password"
          error={errors["New Password"]?.message?.toString()}
          {...register("New Password")}
        />
        <PasswordInput
          label="Confirm New Password"
          error={errors["Confirm New Password"]?.message?.toString()}
          {...register("Confirm New Password")}
        />
        <div className="f justify-end space-x-4 pt-2">
          <Button
            btn="success"
            loading={loading}
            className="w-32"
            onClick={handleSubmit(async (data) => {
              if (data["Confirm New Password"] !== data["New Password"])
                return showToast(
                  "error",
                  "New password and confirm New password are not same."
                );

              if (data["Password"] !== data["New Password"])
                return showToast(
                  "error",
                  "Old password and New password can't be same"
                );

              const res = await run({
                body: JSON.stringify({
                  password: data.Password,
                  newPassword: data["New Password"],
                }),
              });
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
