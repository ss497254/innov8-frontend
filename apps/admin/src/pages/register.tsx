import React from "react";
import {
  NextPageWithLayout,
  Button,
  AuthLayout,
  Input,
  PasswordInput,
  GoogleAuthButton,
} from "common";
import Link from "next/link";

const Register: NextPageWithLayout = () => {
  return (
    <div className="space-y-4 w-80 md:w-96">
      <GoogleAuthButton url="" />
      <div className="relative pt-4">
        <hr className="border-gray-300" />
        <div className="px-3 mx-auto -mt-3 bg-white w-fit">OR</div>
      </div>
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="Firstname" type="text" placeholder="Enter your firstname" />
      <Input label="Lastname" type="text" placeholder="Enter your lastname" />
      <PasswordInput label="Password" placeholder="Enter your password" />
      <Button className="!w-full font-medium">Submit</Button>
      <div>
        Already have an account?{" "}
        <Link href="/login">
          <span className="font-semibold text-blue-500 hover:underline">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

Register.getLayout = (page) => (
  <AuthLayout heading="Register" subheading="Admin dashboard">
    {page}
  </AuthLayout>
);

export default Register;
