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
          "flex items-center mb-3 px-2 py-2.5 cursor-pointer w-full transition font-medium duration-300 hover:bg-dark-200 rounded-lg",
          active ? "bg-dark-200 text-indigo-600 shadow" : "text-gray-800",
        ].join(" ")}
      >
        <div className="c w-11 mr-1">{icon}</div>
        {title}
      </div>
    </Link>
  );
};
