import React, { memo } from "react";

interface ProfileTopBarProps extends React.PropsWithChildren {}

export const ProfileTopBar: React.FC<ProfileTopBarProps> = memo(() => {
  return (
    <div>
      <div className="my-4 py-2 f justify-between ic">
        <h3>Profile</h3>
      </div>
    </div>
  );
});
