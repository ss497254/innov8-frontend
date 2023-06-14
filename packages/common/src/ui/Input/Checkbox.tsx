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
      <div className={containerClassName}>
        <div className="f ic">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className={[
              "w-5 h-5 bg-white focus:ring-blue-500 focus:ring-1",

              error ? "!outline-red-500" : "",
              className,
            ].join(" ")}
            {...props}
          />
          <label
            htmlFor={id}
            className={[
              "ml-2 font-medium py-2 cursor-pointer text-gray-900",
              labelClassName,
            ].join(" ")}
          >
            {label}
          </label>
        </div>
        {desc && <p className="text-sm -mt-1 mb-1 text-gray-600">{desc}</p>}
        {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
      </div>
    );
  }
);
