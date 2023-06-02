import React from "react";

export const BadgeTypes = {
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-800",
  red: "bg-red-100 text-red-800",
  green: "bg-emerald-200 text-emerald-700",
  yellow: "bg-yellow-100 text-yellow-800",
  indigo: "bg-indigo-100 text-indigo-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: keyof typeof BadgeTypes;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, type }) => {
  return (
    <div
      className={[
        className,
        BadgeTypes[type],
        "text-sm uppercase font-medium inline-block mr-2 px-2.5 py-0.5 rounded-full",
      ].join(" ")}
    >
      {children}
    </div>
  );
};
