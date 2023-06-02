import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

const starVariants = {
  initial: {
    scale: 0,
  },
  animate: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: "spring",
      stiffness: 175,
    },
  }),
  exit: (i: number) => ({
    scale: 0,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const Star = ({ i, isHoveringWrapper, active }: any) => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (active && isHovering) starControls.start("hovered");
    else if (active) starControls.start("animate");
    else starControls.start("exit");
  }, [active, isHovering]);

  useEffect(() => {
    if (isHoveringWrapper) {
      backgroundControls.start({
        background: "#ffd700",
      });
      textControls.start({
        color: "#ffd700",
      });
    } else {
      backgroundControls.start({
        background: "#aaa",
      });
      textControls.start({
        color: "#aaa",
      });
    }
  }, [isHoveringWrapper]);

  return (
    <>
      {active || (
        <motion.div
          className="star-background"
          initial={{ background: "#aaa" }}
          animate={backgroundControls}
        />
      )}
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        variants={starVariants}
        initial="initial"
        animate={starControls}
        custom={i}
      >
        <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z"></path>
      </motion.svg>
      <motion.div
        className="text-xl font-semibold text-center"
        initial={{ color: "#aaaaaa" }}
        animate={textControls}
      >
        {i}
      </motion.div>
    </>
  );
};

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  setValue?: (x: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value = 1,
  setValue,
  className,
}) => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <div className={["f text-yellow-400 pb-6 w-fit", className].join(" ")}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          className="r mx-3 w-10 cursor-pointer"
          onMouseOver={() => setIsHovering(i)}
          onMouseLeave={() => setIsHovering(value)}
          onClick={() => setValue?.(i)}
          key={i}
        >
          <Star i={i} isHoveringWrapper={isHovering >= i} active={value >= i} />
        </motion.div>
      ))}
    </div>
  );
};
