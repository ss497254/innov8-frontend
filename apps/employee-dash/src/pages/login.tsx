import React from "react";
import {
  NextPageWithLayout,
  Button,
  AuthLayout,
  Input,
  PasswordInput,
  GoogleAuthButton,
} from "common";

const Login: NextPageWithLayout = () => {
  return (
    <div className="space-y-5 w-80 md:w-96">
      <GoogleAuthButton url="" />
      <div className="relative pt-4">
        <hr className="border-gray-300" />
        <div className="px-3 mx-auto -mt-3 bg-white w-fit">OR</div>
      </div>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <Button className="!w-full font-medium">Submit</Button>
    </div>
  );
};

Login.getLayout = (page) => (
  <AuthLayout heading="Login" subheading="Employee dashboard">
    {page}
  </AuthLayout>
);

export default Login;
