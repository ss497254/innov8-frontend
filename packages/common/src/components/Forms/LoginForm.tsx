import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { showToast } from "../../lib/showToast";
import { useUserStore } from "../../stores";
import { UserType } from "../../types";
import { Button, Input, PasswordInput } from "../../ui";

interface LoginFormProps extends React.PropsWithChildren {
  url: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ url }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useUserStore();
  const { run, loading } = useApi<UserType>("POST", url);

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
          if (res && res.success) {
            showToast("success", "Login successful", res.message);
            setUser(res.data);
            Router.replace(window.location.search.replace("?next=", "") || "/");
          } else {
            showToast("error", "Unable to login", res.error);
          }
        })}
      >
        Submit
      </Button>
    </>
  );
};
