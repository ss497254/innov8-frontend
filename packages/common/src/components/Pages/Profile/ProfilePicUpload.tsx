import { useApi } from "common/src/hooks/useApi";
import { Button, FileInput } from "common/src/ui";
import React from "react";
import { useUserStore } from "../../../stores";

interface ProfilePicUploadProps extends React.PropsWithChildren {}

export const ProfilePicUpload: React.FC<ProfilePicUploadProps> = () => {
  const { user } = useUserStore();
  const { run, loading } = useApi("PUT", `/${user?.role}/profile`);

  return (
    <div className="max-w-6xl mx-auto lg:flex py-4">
      <h4 className="lg:w-[35%] mb-6">Profile Picture</h4>
      <div className="space-y-4 p-5 md:p-8 lg:w-[65%] bg-white rounded-md shadow-md">
        <FileInput
          label="Upload Profile picture"
          labelClassName="!text-lg mb-2 font-semibold"
        />
        <div className="f justify-end space-x-4 pt-2">
          <Button btn="success" loading={loading} className="w-32">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
