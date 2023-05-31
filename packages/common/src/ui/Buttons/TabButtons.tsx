import { motion } from "framer-motion";
import { useId, useState } from "react";

interface TabButtonsProps extends React.PropsWithChildren {
  tabs: string[] | readonly string[];
  activeTab: string;
  setActiveTab: (x: string) => void;
  className?: string;
}

export const TabButtons: React.FC<TabButtonsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  className,
}) => {
  const [hoveringTab, setHoveringTab] = useState(activeTab);
  const id1 = useId(),
    id2 = useId();

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={[
            className,
            "r text-sm py-2 font-medium transition-all !ring-0",
          ].join(" ")}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab && (
            <motion.span
              layoutId={id1}
              className="absolute inset-0 z-10 border-b-2 py-4 border-indigo-600"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {hoveringTab === tab && (
            <motion.div
              layoutId={id2}
              className="absolute inset-y-2 inset-x-1 bg-indigo-500/10 rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            ></motion.div>
          )}
          <div
            onMouseEnter={() => setHoveringTab(tab)}
            onMouseLeave={() => setHoveringTab(activeTab)}
            className={[
              "min-w-[56px] md:min-w-[80px] r z-10 px-3 md:px-4 py-1.5",
              activeTab === tab ? "text-indigo-600" : "hover:text-indigo-600",
            ].join(" ")}
          >
            {tab}
          </div>
        </button>
      ))}
    </div>
  );
};
