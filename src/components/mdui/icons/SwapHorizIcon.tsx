import React from 'react';

interface SwapHorizIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SwapHorizIcon: React.FC<SwapHorizIconProps> = ({ 
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
      
<path d="M7 20L2 15L7 10L8.4 11.425L5.825 14H13V16H5.825L8.4 18.575L7 20ZM17 14L15.6 12.575L18.175 10H11V8H18.175L15.6 5.425L17 4L22 9L17 14Z"/>


    </svg>
  );
};

export default SwapHorizIcon;
