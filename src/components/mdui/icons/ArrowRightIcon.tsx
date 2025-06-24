import React from 'react';

interface ArrowRightIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ 
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
      
<path d="M10 17V7L15 12L10 17Z"/>


    </svg>
  );
};

export default ArrowRightIcon;
