import React, { useId } from "react";
import { sizes } from "./Input";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
  desc?: string;
  size?: keyof typeof sizes;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  size = "md",
  className,
  error,
  desc,
  containerClassName,
  labelClassName,
  ...props
}) => {
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
      <label
        htmlFor={id}
        className="cc w-full h-32 border border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mb-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <input id={id} type="file" className="hidden" {...props} />
      </label>
      {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
    </div>
  );
};
