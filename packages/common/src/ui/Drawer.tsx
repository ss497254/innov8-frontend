import React from "react";

interface props {
  open: boolean;
  dir?: "left" | "right";
  backdrop?: boolean;
  permanent?: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<props> = ({
  open,
  children,
  dir = "left",
  toggleOpen,
  backdrop = true,
  permanent,
  className = "",
}) => {
  let cn = "";

  if (!permanent && !open)
    cn = dir === "left" ? "-translate-x-full" : "translate-x-full";

  return (
    <>
      <div
        className={[
          "fc border-gray-200 duration-500 top-0 left-0 fixed z-50 h-screen w-64 scroll-thin",
          cn,
          dir === "left" ? "border-r" : "border-l",
          className,
        ].join(" ")}
        tabIndex={-1}
      >
        {children}
      </div>
      <div
        onClick={toggleOpen}
        className={
          backdrop && open
            ? "absolute inset-y-0 z-10 w-screen bg-gray-900/20"
            : undefined
        }
      />
    </>
  );
};
