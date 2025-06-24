import React from 'react';

interface SkipNextIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SkipNextIcon: React.FC<SkipNextIconProps> = ({ 
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
      
<path d="M16.5 18V6H18.5V18H16.5ZM5.5 18V6L14.5 12L5.5 18ZM7.5 14.25L10.9 12L7.5 9.75V14.25Z"/>


    </svg>
  );
};

export default SkipNextIcon;
