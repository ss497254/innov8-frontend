import { NextPageWithLayout } from "common/src/types";
import { Input, PasswordInput, Button } from "common/src/ui";
import { AuthLayout, GoogleAuthButton } from "common/src/components";
import Link from "next/link";

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
      <div>
        Don't have an account?{" "}
        <Link href="/register">
          <span className="font-semibold text-blue-500 hover:underline">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
};

Login.getLayout = (page) => (
  <AuthLayout heading="Login" subheading="Admin dashboard">
    {page}
  </AuthLayout>
);

export default Login;
