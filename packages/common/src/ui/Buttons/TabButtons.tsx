import { motion } from "framer-motion";

interface TabButtonsProps extends React.PropsWithChildren {
  tabs: string[];
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
  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={[
            className,
            activeTab === tab ? "" : "hover:text-indigo-600",
            "relative text-center min-w-[80px] text-sm py-3 font-medium transition-all !ring-0",
          ].join(" ")}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 border-b-2 py-4 border-indigo-600"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={activeTab === tab ? "text-indigo-600" : ""}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
};
