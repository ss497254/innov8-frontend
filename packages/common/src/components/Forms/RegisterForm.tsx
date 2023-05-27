import React from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { showToast } from "../../lib/showToast";
import { Input, PasswordInput, Button } from "../../ui";

interface RegisterFormProps extends React.PropsWithChildren {
  url: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ url }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { run, loading } = useApi("POST", url);

  return (
    <>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={
          errors.email?.message?.toString() || errors.email?.type?.toString()
        }
        {...register("email", { required: true })}
      />
      <Input
        label="Firstname"
        type="text"
        placeholder="Enter your firstname"
        error={
          errors.firstName?.message?.toString() ||
          errors.firstName?.type?.toString()
        }
        {...register("firstName", { required: true })}
      />
      <Input
        label="Lastname"
        type="text"
        placeholder="Enter your lastname"
        error={
          errors.lastName?.message?.toString() ||
          errors.lastName?.type?.toString()
        }
        {...register("lastName", { required: true })}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error={
          errors.password?.message?.toString() ||
          errors.password?.type?.toString()
        }
        {...register("password", { required: true, minLength: 8 })}
      />
      <Button
        className="!w-full font-medium"
        loading={loading}
        onClick={handleSubmit(async (data: any) => {
          const res = await run({ body: JSON.stringify(data) });
          if (res && res.success) {
            reset();
            showToast("success", "Registration successful", res.message);
          } else {
            showToast("error", "Unable to register", res.error);
          }
        })}
      >
        Submit
      </Button>
    </>
  );
};
