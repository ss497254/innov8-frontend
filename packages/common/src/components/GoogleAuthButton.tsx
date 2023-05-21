import React from "react";
import { useApi } from "../hooks/useApi";
import { GoogleIcon } from "../icons";
import { Button } from "../ui/Button";

interface GoogleAuthButtonProps {
  url: string;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ url }) => {
  const { run, loading } = useApi<any>("GET", url);
  return (
    <Button
      onClick={async () => {
        const res = await run();
        if (res && res.success) {
          window.location = res.data.url;
        }
      }}
      loading={loading}
      btn="danger"
      className="w-full text-lg font-semibold"
    >
      <GoogleIcon className="mr-3" size={18} />
      Login with Google
    </Button>
  );
};
