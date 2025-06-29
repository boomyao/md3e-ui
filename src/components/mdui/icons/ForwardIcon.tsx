import React from 'react';

interface ForwardIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ForwardIcon: React.FC<ForwardIconProps> = ({ 
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
      
<path d="M16 17L14.575 15.6L19.175 11L14.575 6.4L16 5L22 11L16 17ZM2 19V15C2 13.6167 2.48333 12.4417 3.45 11.475C4.43333 10.4917 5.61667 10 7 10H13.175L9.575 6.4L11 5L17 11L11 17L9.575 15.6L13.175 12H7C6.16667 12 5.45833 12.2917 4.875 12.875C4.29167 13.4583 4 14.1667 4 15V19H2Z"/>


    </svg>
  );
};

export default ForwardIcon;
