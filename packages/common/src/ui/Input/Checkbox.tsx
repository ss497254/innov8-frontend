import React, { forwardRef, useId } from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;

  desc?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
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
      <div className={["f ic", containerClassName].join(" ")}>
        {desc && <p className="text-sm -mt-1 mb-1">{desc}</p>}
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={[
            "w-5 h-5 text-blue-600 cursor-pointer bg-gray-100 transition-all duration-300 !rounded-full focus:border-blue-500 focus:border-2 outline-none",
            error ? "!outline-red-500" : "",
            className,
          ].join(" ")}
          {...props}
        />
        <label
          htmlFor={id}
          className={["ml-2 font-medium text-gray-900", labelClassName].join(
            " "
          )}
        >
          {label}
        </label>
        {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
      </div>
    );
  }
);
