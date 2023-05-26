import { useRouter } from "next/router";
import React from "react";
import { Item, ItemProps } from "./Item";

interface props {
  heading: string;
  items: Omit<ItemProps, "active">[];
}

const isActive = (a: string, b: string) => {
  if (b === "/") return a === "/";

  return a.includes(b);
};

export const ItemGroup: React.FC<props> = ({ heading, items }) => {
  const { pathname } = useRouter();

  return (
    <div className="mb-4">
      <div className="mx-6 mb-2 text-xs font-semibold uppercase">{heading}</div>
      {items.map((item, idx) => (
        <Item key={idx} active={isActive(pathname, item.href)} {...item} />
      ))}
    </div>
  );
};
