import React from 'react';

interface StarFilledIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const StarFilledIcon: React.FC<StarFilledIconProps> = ({ 
  size = 24, 
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      
<path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z"/>


    </svg>
  );
};

export default StarFilledIcon;
