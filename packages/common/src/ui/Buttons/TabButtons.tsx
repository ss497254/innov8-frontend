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
            activeTab === tab ? "" : "hover:text-black/60",
            "relative text-center w-20 text-sm py-4 font-medium text-black outline-sky-400 transition focus-visible:outline-2",
            className,
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
