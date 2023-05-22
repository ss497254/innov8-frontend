import React from "react";

interface OrSeparatorProps extends React.PropsWithChildren {}

export const OrSeparator: React.FC<OrSeparatorProps> = () => {
  return (
    <div className="relative pt-4">
      <hr className="border-gray-300" />
      <div className="px-3 mx-auto -mt-3 bg-white w-fit">OR</div>
    </div>
  );
};
