import React from "react";
import { Button, Input, PasswordInput } from "../../ui";

interface LoginFormProps extends React.PropsWithChildren {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  return (
    <>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <Button className="!w-full font-medium">Submit</Button>
    </>
  );
};
