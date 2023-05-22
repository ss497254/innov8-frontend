import React from "react";
import { useApi } from "../hooks/useApi";
import { GoogleIcon } from "../icons";
import { Button } from "../ui/Buttons";

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
      size="lg"
      btn="danger"
      className="w-full font-medium"
    >
      <GoogleIcon className="mr-3" size={20} />
      Continue with Google
    </Button>
  );
};
