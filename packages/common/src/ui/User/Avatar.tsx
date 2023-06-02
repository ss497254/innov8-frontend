import React, { useState } from "react";
import { ProfileIcon } from "../../icons";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(!src);

  if (imageError) return <ProfileIcon size={size} className={className} />;

  return (
    <img
      src={src}
      height={size}
      width={size}
      className={className}
      onError={() => setImageError(true)}
      {...props}
    />
  );
};
