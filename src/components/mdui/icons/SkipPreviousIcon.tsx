import React from 'react';

interface SkipPreviousIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SkipPreviousIcon: React.FC<SkipPreviousIconProps> = ({ 
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
      
<path d="M5.5 18V6H7.5V18H5.5ZM18.5 18L9.5 12L18.5 6V18ZM16.5 14.25V9.75L13.1 12L16.5 14.25Z"/>


    </svg>
  );
};

export default SkipPreviousIcon;
