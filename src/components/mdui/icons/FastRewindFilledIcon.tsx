import React from 'react';

interface FastRewindFilledIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FastRewindFilledIcon: React.FC<FastRewindFilledIconProps> = ({ 
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
      
<path d="M21.5 18L12.5 12L21.5 6V18ZM11.5 18L2.5 12L11.5 6V18Z"/>


    </svg>
  );
};

export default FastRewindFilledIcon;
