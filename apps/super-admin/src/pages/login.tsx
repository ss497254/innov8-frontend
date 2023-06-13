import { AuthLayout, GoogleAuthButton, LoginForm } from "common/src/components";
import { NextPageWithLayout } from "common/src/types";
import { OrSeparator } from "common/src/ui";

import Link from "next/link";

const Login: NextPageWithLayout = () => {
  return (
    <div className="space-y-5 w-80 md:w-96">
      <LoginForm url="/super-admin/login" />
    </div>
  );
};

Login.getLayout = (page) => (
  <AuthLayout heading="Login" subheading="Super Admin dashboard">
    {page}
  </AuthLayout>
);

export default Login;
