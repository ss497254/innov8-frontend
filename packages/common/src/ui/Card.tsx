import React from "react";

interface props {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<props> = ({ children, className }) => {
  return (
    <div
      className={[
        "p-5 bg-white rounded-lg border-gray-500 shadow-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};
