import Link from "next/link";
import React, { ReactNode } from "react";

export interface ItemProps {
  href: string;
  icon: ReactNode;
  title: string;
  active: boolean;
}

export const Item: React.FC<ItemProps> = ({ href, icon, title, active }) => {
  return (
    <Link href={href}>
      <div
        className={[
          "flex items-center mb-2 pl-4 py-2.5 cursor-pointer rounded-md mx-4 transition font-medium duration-300 hover:bg-dark-200",
          active ? "text-indigo-600 bg-indigo-50" : "text-gray-800",
        ].join(" ")}
      >
        <div className="c w-11 mr-1">{icon}</div>
        {title}
      </div>
    </Link>
  );
};
