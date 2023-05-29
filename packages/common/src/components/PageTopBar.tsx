import React from "react";

interface PageTopBarProps extends React.PropsWithChildren {
  heading: string;
  rightChildren?: React.ReactNode;
}

export const PageTopBar: React.FC<PageTopBarProps> = ({
  heading,
  children,
  rightChildren,
}) => {
  return (
    <div>
      <div className="my-4 f ic space-x-3">
        <h3>{heading}</h3>
        <div className="flex-1" />
        {rightChildren}
      </div>
      {children && <div className="border-b border-dark-400">{children}</div>}
    </div>
  );
};
