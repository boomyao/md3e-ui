import React from 'react';

interface CheckSmallIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CheckSmallIcon: React.FC<CheckSmallIconProps> = ({ 
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
      
<path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"/>


    </svg>
  );
};

export default CheckSmallIcon;
