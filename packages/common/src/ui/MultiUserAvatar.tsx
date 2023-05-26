import React from "react";

export interface AvatarProps {
  srcArray: string[];
  className?: string;
  size: number;
}

export const MultiUserAvatar: React.FC<AvatarProps> = ({
  size,
  srcArray,
  className = "",
}) => {
  return (
    <div className={`f ${className}`}>
      {srcArray.slice(0, 3).map((src, i) => (
        <span
          key={i}
          className="rounded-full border"
          style={{
            zIndex: srcArray.length - i,
            marginLeft: i > 0 ? -5 : 0,
            overflow: "hidden",
            height: size,
            width: size,
          }}
        >
          <img src={src} />
        </span>
      ))}
    </div>
  );
};
