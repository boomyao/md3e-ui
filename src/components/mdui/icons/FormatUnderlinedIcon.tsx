import React from 'react';

interface FormatUnderlinedIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FormatUnderlinedIcon: React.FC<FormatUnderlinedIconProps> = ({ 
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
      
<path d="M5 21V19H19V21H5ZM12 17C10.3167 17 9.00833 16.475 8.075 15.425C7.14167 14.375 6.675 12.9833 6.675 11.25V3H9.25V11.4C9.25 12.3333 9.48333 13.0917 9.95 13.675C10.4167 14.2583 11.1 14.55 12 14.55C12.9 14.55 13.5833 14.2583 14.05 13.675C14.5167 13.0917 14.75 12.3333 14.75 11.4V3H17.325V11.25C17.325 12.9833 16.8583 14.375 15.925 15.425C14.9917 16.475 13.6833 17 12 17Z"/>


    </svg>
  );
};

export default FormatUnderlinedIcon;
