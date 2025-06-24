import React from 'react';

interface SwapVertIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SwapVertIcon: React.FC<SwapVertIconProps> = ({ 
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
      
<path d="M8 13V5.825L5.425 8.4L4 7L9 2L14 7L12.575 8.4L10 5.825V13H8ZM15 22L10 17L11.425 15.6L14 18.175V11H16V18.175L18.575 15.6L20 17L15 22Z"/>


    </svg>
  );
};

export default SwapVertIcon;
