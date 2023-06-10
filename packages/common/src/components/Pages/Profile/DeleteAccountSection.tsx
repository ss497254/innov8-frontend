import { useApi } from "common/src/hooks/useApi";
import { Button } from "common/src/ui";
import React from "react";
import { showToast } from "../../../lib/showToast";
import { useUserStore } from "../../../stores";

interface DeleteAccountSectionProps extends React.PropsWithChildren {}

export const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = () => {
  const { user } = useUserStore();
  const { run, loading } = useApi("GET", `/${user?.role}/delete-account`);

  return (
    <div className="max-w-6xl mx-auto lg:flex py-4">
      <h4 className="lg:w-[35%] mb-6">Delete Account</h4>
      <div className="space-y-4 p-5 md:p-8 lg:w-[65%] bg-white rounded-md shadow-md">
        <p className="font-semibold">
          Permanently remove your Personal Account and all of its contents from
          our platform. This action is not reversible, so please continue with
          caution.
        </p>
        <div className="f justify-end space-x-4 pt-2">
          <Button
            btn="danger"
            loading={loading}
            className="w-44"
            onClick={async (data) => {
              const res = await run({ body: JSON.stringify(data) });
              if (res && res.success)
                showToast(
                  "success",
                  "Profile deleted successfully",
                  res.message
                );
              else showToast("error", "Cannot delete profile", res.error);
            }}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};
