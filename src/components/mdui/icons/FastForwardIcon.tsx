import React from 'react';

interface FastForwardIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FastForwardIcon: React.FC<FastForwardIconProps> = ({ 
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
      
<path d="M2.5 18V6L11.5 12L2.5 18ZM12.5 18V6L21.5 12L12.5 18ZM4.5 14.25L7.9 12L4.5 9.75V14.25ZM14.5 14.25L17.9 12L14.5 9.75V14.25Z"/>


    </svg>
  );
};

export default FastForwardIcon;
