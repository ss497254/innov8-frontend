import React from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { showToast } from "../../lib/showToast";
import { Button, Input, PasswordInput } from "../../ui";

interface LoginFormProps extends React.PropsWithChildren {
  url: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ url }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { run, loading, error } = useApi("POST", url);

  return (
    <>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.type?.toString()}
        {...register("email", { required: true })}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.type?.toString()}
        {...register("password", { required: true, minLength: 8 })}
      />
      <Button
        className="!w-full font-medium"
        loading={loading}
        onClick={handleSubmit(async (data: any) => {
          const res = await run({ body: JSON.stringify(data) });
          if (res && res.success) reset();
          else {
            showToast("error", "Unable to login", error || res?.message);
          }
        })}
      >
        Submit
      </Button>
    </>
  );
};
