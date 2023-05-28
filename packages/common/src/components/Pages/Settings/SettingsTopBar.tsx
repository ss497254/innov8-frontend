import React from "react";

interface SettingsTopBarProps extends React.PropsWithChildren {}

export const SettingsTopBar: React.FC<SettingsTopBarProps> = () => {
  return (
    <div>
      <div className="my-4 py-2 f justify-between ic">
        <h3>Settings</h3>
      </div>
    </div>
  );
};
