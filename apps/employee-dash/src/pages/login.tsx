import React from "react";
import { NextPageWithLayout, Button, AuthLayout } from "common";

const Login: NextPageWithLayout = () => {
  return (
    <div>
      <Button>Submit</Button>
    </div>
  );
};

Login.getLayout = (page) => (
  <AuthLayout heading="Login" subheading="Login to employee's dashboard">
    {page}
  </AuthLayout>
);

export default Login;
