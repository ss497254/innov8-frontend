import React from "react";

interface ProjectFieldProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "size"> {
  heading: string;
  containerClassName?: string;
  headingClassName?: string;
  error?: string;
  desc?: string;
}

export const ProjectField: React.FC<ProjectFieldProps> = ({
  heading,
  className,
  error,
  desc,
  containerClassName,
  headingClassName,
  children,
  ...props
}) => {
  return (
    <div className={["", containerClassName].join(" ")}>
      <div
        className={[
          "block mb-1 text-base font-medium text-gray-900",
          headingClassName,
        ].join(" ")}
      >
        {heading}
      </div>
      {desc && <p className="text-sm -mt-1 mb-1">{desc}</p>}
      <p
        className={[
          "bg-gray-50 border border-gray-300 min-h-[80px] text-gray-900 w-full px-3 py-2 rounded-md",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </p>
    </div>
  );
};
