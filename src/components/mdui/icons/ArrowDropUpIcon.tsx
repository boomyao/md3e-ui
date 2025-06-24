import React from 'react';

interface ArrowDropUpIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowDropUpIcon: React.FC<ArrowDropUpIconProps> = ({ 
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
      
<path d="M7 14L12 9L17 14H7Z"/>


    </svg>
  );
};

export default ArrowDropUpIcon;
