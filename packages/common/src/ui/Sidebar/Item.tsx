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
          "flex items-center px-4 [&>svg]:mr-4 py-2.5 cursor-pointer w-full mb-2 transition font-medium duration-300 hover:bg-gray-200 rounded-lg",
          active ? "bg-dark-200 shadow text-black" : "",
        ].join(" ")}
      >
        {icon}
        {title}
      </div>
    </Link>
  );
};
