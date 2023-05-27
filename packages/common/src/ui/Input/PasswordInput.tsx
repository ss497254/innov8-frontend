import React, { forwardRef, useState } from "react";
import { sizes } from "./Input";

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const EyeClose = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.76404 5.29519C10.4664 5.10724 11.2123 5 12 5C15.7574 5 18.564 7.4404 20.2326 9.43934C21.4848 10.9394 21.4846 13.0609 20.2324 14.5609C20.0406 14.7907 19.8337 15.0264 19.612 15.2635M12.5 9.04148C13.7563 9.25224 14.7478 10.2437 14.9585 11.5M3 3L21 21M11.5 14.9585C10.4158 14.7766 9.52884 14.0132 9.17072 13M4.34914 8.77822C4.14213 9.00124 3.94821 9.22274 3.76762 9.43907C2.51542 10.9391 2.51523 13.0606 3.76739 14.5607C5.43604 16.5596 8.24263 19 12 19C12.8021 19 13.5608 18.8888 14.2744 18.6944"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label: string;
  containerClassName?: string;
  error?: string;
  size?: keyof typeof sizes;
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, id, size = "md", className, error, containerClassName, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className={["", containerClassName].join(" ")}>
        <label
          htmlFor={id}
          className="block mb-1 text-base font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            className={[
              "bg-white border border-gray-300 text-gray-900 focus:outline-2 focus:outline-blue-500 w-full",
              sizes[size],
              error ? "!outline-red-500" : "",
              className,
            ].join(" ")}
            {...props}
            ref={ref}
          />
          <button
            className="absolute right-2 bottom-1 top-1 bg-gray-200 my-auto h-7 w-7 p-1 rounded text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>}
      </div>
    );
  }
);
