import React from "react";
import {
  NextPageWithLayout,
  Button,
  AuthLayout,
  Input,
  PasswordInput,
} from "common";

const Login: NextPageWithLayout = () => {
  return (
    <div className="space-y-5 w-80 md:w-96">
      <Input label="Email" type="email" placeholder="Enter your email" />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <Button className="!w-full !py-2.5 font-semibold">Submit</Button>
    </div>
  );
};

Login.getLayout = (page) => (
  <AuthLayout heading="Login" subheading="Employee dashboard">
    {page}
  </AuthLayout>
);

export default Login;
