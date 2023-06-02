import { AuthLayout, GoogleAuthButton, LoginForm } from "common/src/components";
import { NextPageWithLayout } from "common/src/types";
import { OrSeparator } from "common/src/ui";

import Link from "next/link";

const Login: NextPageWithLayout = () => {
  return (
    <div className="space-y-5 w-80 md:w-96">
      <GoogleAuthButton url="" />
      <OrSeparator />
      <LoginForm url="/coach/login" />
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
  <AuthLayout heading="Login" subheading="Coach dashboard">
    {page}
  </AuthLayout>
);

export default Login;
