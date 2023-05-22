import { useRouter } from "next/router";
import React from "react";
import { Item, ItemProps } from "./Item";

interface props {
  heading: string;
  items: Omit<ItemProps, "active">[];
}

export const ItemGroup: React.FC<props> = ({ heading, items }) => {
  const router = useRouter();

  return (
    <div className="mx-4 mb-4">
      <div className="mx-4 mb-2 text-xs font-semibold uppercase text-dark-200">
        {heading}
      </div>
      {items.map((item, idx) => (
        <Item
          key={idx}
          active={item.href ? router.pathname === item.href : false}
          {...item}
        />
      ))}
    </div>
  );
};
