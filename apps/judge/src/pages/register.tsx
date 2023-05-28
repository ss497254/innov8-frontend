import {
  AuthLayout,
  GoogleAuthButton,
  RegisterForm,
} from "common/src/components";
import { NextPageWithLayout } from "common/src/types";
import { OrSeparator } from "common/src/ui";
import Link from "next/link";

const Register: NextPageWithLayout = () => {
  return (
    <div className="space-y-4 w-80 md:w-96">
      <GoogleAuthButton url="" />
      <OrSeparator />
      <RegisterForm url="/judge/register" />
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
  <AuthLayout heading="Register" subheading="Judge dashboard">
    {page}
  </AuthLayout>
);

export default Register;
