import { useRouter } from "next/router";
import { useEffect } from "react";
import { LogoIcon } from "../../icons";
import { useSidebarDrawerStore } from "../../stores/useSidebarDrawerStore";
import { useWindowSizeStore } from "../../stores/useWindowSizeStore";
import { Drawer } from "../Drawer";
import { ItemGroup } from "./ItemGroup";

interface props {
  items: {
    heading: string;
    items: {
      href: string;
      icon: JSX.Element;
      title: string;
    }[];
  }[];
}

export const Sidebar: React.FC<props> = ({ items }) => {
  const value = useSidebarDrawerStore();
  const router = useRouter();
  const { width } = useWindowSizeStore();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (value.open) {
        value.toggleOpen();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  return (
    <Drawer
      {...value}
      className="pb-10 overflow-y-scroll hide-scroll bg-white"
      permanent={width > 1024}
    >
      <LogoIcon className="text-indigo-600 ml-2 mt-6 mb-10" size={24} />
      {items.map((navGroup, idx) => (
        <ItemGroup key={idx} {...navGroup} />
      ))}
    </Drawer>
  );
};
