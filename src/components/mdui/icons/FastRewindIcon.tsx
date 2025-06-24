import React from 'react';

interface FastRewindIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FastRewindIcon: React.FC<FastRewindIconProps> = ({ 
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
      
<path d="M21.5 18L12.5 12L21.5 6V18ZM11.5 18L2.5 12L11.5 6V18ZM9.5 14.25V9.75L6.1 12L9.5 14.25ZM19.5 14.25V9.75L16.1 12L19.5 14.25Z"/>


    </svg>
  );
};

export default FastRewindIcon;
