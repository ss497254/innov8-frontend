import React from "react";
import { NextPageWithLayout, Button } from "common";
import { useToastStore } from "common/src/stores/useToastStore";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  const { add } = useToastStore();
  return (
    <div className="bg-red-200">
      Home
      <Button
        onClick={() => {
          add({
            message: "asdfasdf",
            desc: "this is a toast",
            type: "error",
          });
        }}
      >
        TAsd
      </Button>
      <Link href="/login">Login Page</Link>
    </div>
  );
};

export default Home;
