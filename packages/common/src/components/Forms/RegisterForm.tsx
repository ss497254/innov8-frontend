import React from "react";
import { Input, PasswordInput, Button } from "../../ui";

interface RegisterFormProps extends React.PropsWithChildren {}

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  return (
    <>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="Firstname" type="text" placeholder="Enter your firstname" />
      <Input label="Lastname" type="text" placeholder="Enter your lastname" />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <Button className="!w-full font-medium">Submit</Button>
    </>
  );
};
