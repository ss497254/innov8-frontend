import React from "react";

interface props {}

export const IconButton: React.FC<
  props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...prop }) => {
  return (
    <button
      className={["c rounded-md bg-dark-200 h-10 w-10", className].join(" ")}
      {...prop}
    >
      {children}
    </button>
  );
};
