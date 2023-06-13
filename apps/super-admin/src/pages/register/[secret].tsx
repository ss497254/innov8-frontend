import { AuthLayout, RegisterForm } from "common/src/components";
import { NextPageWithLayout } from "common/src/types";
import { useRouter } from "next/router";

const Register: NextPageWithLayout = () => {
  const { query } = useRouter();

  return (
    <div className="space-y-4 w-80 md:w-96">
      <RegisterForm url={"/super-admin/register" + query.secret} />
    </div>
  );
};

Register.getLayout = (page) => (
  <AuthLayout heading="Register" subheading="Super Admin dashboard">
    {page}
  </AuthLayout>
);

export default Register;
