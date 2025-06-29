import React from 'react';

interface FlashlightOnIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FlashlightOnIcon: React.FC<FlashlightOnIconProps> = ({ 
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
      
<path d="M8 22V11L6 8V2H18V8L16 11V22H8ZM12 15.5C11.5833 15.5 11.2292 15.3542 10.9375 15.0625C10.6458 14.7708 10.5 14.4167 10.5 14C10.5 13.5833 10.6458 13.2292 10.9375 12.9375C11.2292 12.6458 11.5833 12.5 12 12.5C12.4167 12.5 12.7708 12.6458 13.0625 12.9375C13.3542 13.2292 13.5 13.5833 13.5 14C13.5 14.4167 13.3542 14.7708 13.0625 15.0625C12.7708 15.3542 12.4167 15.5 12 15.5ZM8 5H16V4H8V5ZM16 7H8V7.4L10 10.4V20H14V10.4L16 7.4V7Z"/>


    </svg>
  );
};

export default FlashlightOnIcon;
