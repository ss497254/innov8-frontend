import React, { forwardRef, useId } from "react";

export const sizes = {
  sm: "py-1 px-2 text-sm placeholder:text-xs rounded",
  md: "py-2 px-3 placeholder:text-sm rounded-md",
  lg: "py-2.5 px-4 placeholder:text-sm rounded-lg",
};

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
  desc?: string;
  size?: keyof typeof sizes;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = "md",
      className,
      error,
      desc,
      containerClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={["", containerClassName].join(" ")}>
        <label
          htmlFor={id}
          className={[
            "block mb-1 text-base font-medium text-gray-900",
            labelClassName,
          ].join(" ")}
        >
          {label}
        </label>
        {desc && <p className="text-sm -mt-1 mb-1">{desc}</p>}
        <input
          id={id}
          ref={ref}
          className={[
            "bg-gray-50 border border-gray-300 text-gray-900 focus:outline-2 focus:outline-blue-500 w-full",
            sizes[size],
            error ? "!outline-red-500" : "",
            className,
          ].join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
      </div>
    );
  }
);
