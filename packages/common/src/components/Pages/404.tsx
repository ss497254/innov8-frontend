import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Buttons/Button";

export const Error404 = () => {
  const [show404, setShow404] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow404(true);
    }, 200);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div
        className={`select-none opacity-10 text-gray-900 duration-300 transition-all ${
          show404 ? "blur-sm" : "blur-none"
        }`}
      >
        <h1 style={{ fontSize: "35vw" }}>404</h1>
      </div>
      <div
        className={`absolute z-10 flex flex-col duration-300 items-center justify-center space-y-6 transition-opacity ${
          show404 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-[380px] flex-col items-center justify-center space-y-3 text-center">
          <h3 className="text-2xl text-indigo-600">
            Looking for something? 🔍
          </h3>
          <p>We couldn't find the page that you're looking for!</p>
        </div>
        <Link href="/">
          <Button className="font-semibold" size="md" btn="accent">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
