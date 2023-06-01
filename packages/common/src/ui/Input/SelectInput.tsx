import React, { useId, useState } from "react";
import { CaretIcon } from "../../icons";
import { sizes } from "./Input";

interface props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  options: React.ReactNode[];
  desc?: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
  size?: keyof typeof sizes;
  children: React.ReactNode;
}

export const SelectInput: React.FC<props> = ({
  options,
  label,
  desc,
  error,
  className,
  containerClassName,
  labelClassName,
  size = "md",
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={["r", containerClassName].join(" ")}>
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
      <div
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(setOpen, 500, false)}
        className={[
          "r bg-gray-50 border border-gray-300 text-gray-900 focus:outline-2 focus:outline-blue-500 w-full",
          sizes[size],
          error ? "!outline-red-500" : "",
          className,
        ].join(" ")}
      >
        {options.map((option, idx) => (
          <div
            className="px-1 py-2 inline-block text-left rounded-full mr-2 mb-2 bg-gray-200"
            key={idx}
          >
            {option}
          </div>
        ))}
        <input
          id={id}
          className="outline-none bg-inherit w-full p-1"
          {...props}
        />
        <CaretIcon
          size={22}
          className="text-dark-600 absolute right-4 bottom-3"
        />
      </div>
      <div
        className={`absolute z-10 inset-x-0 shadow-lg top-[105%] p-2 d10 transition-all b rounded-md bg-gray-50 border-dark-300 ${
          open ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
