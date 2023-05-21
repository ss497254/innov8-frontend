import React from "react";
import { sizes } from "./Input";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label: string;
  containerClassName?: string;
  error?: string;
  size?: keyof typeof sizes;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  size = "md",
  className,
  error,
  containerClassName,
  ...props
}) => {
  return (
    <div className={["", containerClassName].join(" ")}>
      <label
        htmlFor={id}
        className="block mb-1 text-base font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={id}
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
};
