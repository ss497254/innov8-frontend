import React, { forwardRef } from "react";

export const SearchOverlay = forwardRef(
  (
    { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "absolute flex flex-col rounded-xl pt-12 px-4 bg-dark-100 border border-gray-300 shadow-xl",
          className,
        ].join(" ")}
        style={{
          minHeight: "100px",
          maxHeight: "50vh",
          top: "-5px",
          left: "-5px",
          right: "0px",
          width: "calc(100% + 10px)",
          zIndex: -1,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SearchOverlay.displayName = "SearchOverlay";
