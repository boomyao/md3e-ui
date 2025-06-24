import React from 'react';

interface FastForwardFilledIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FastForwardFilledIcon: React.FC<FastForwardFilledIconProps> = ({ 
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
      
<path d="M2.5 18V6L11.5 12L2.5 18ZM12.5 18V6L21.5 12L12.5 18Z"/>


    </svg>
  );
};

export default FastForwardFilledIcon;
