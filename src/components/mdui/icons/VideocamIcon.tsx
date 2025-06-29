import React from 'react';

interface VideocamIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const VideocamIcon: React.FC<VideocamIconProps> = ({ 
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
      
<path d="M4 20C3.45 20 2.975 19.8083 2.575 19.425C2.19167 19.025 2 18.55 2 18V6C2 5.45 2.19167 4.98333 2.575 4.6C2.975 4.2 3.45 4 4 4H16C16.55 4 17.0167 4.2 17.4 4.6C17.8 4.98333 18 5.45 18 6V10.5L22 6.5V17.5L18 13.5V18C18 18.55 17.8 19.025 17.4 19.425C17.0167 19.8083 16.55 20 16 20H4ZM4 18H16V6H4V18ZM4 18V6V18Z"/>


    </svg>
  );
};

export default VideocamIcon;
