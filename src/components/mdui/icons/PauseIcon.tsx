import React from 'react';

interface PauseIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const PauseIcon: React.FC<PauseIconProps> = ({ 
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
      
<path d="M14 19V5H18V19H14ZM6 19V5H10V19H6Z"/>


    </svg>
  );
};

export default PauseIcon;
