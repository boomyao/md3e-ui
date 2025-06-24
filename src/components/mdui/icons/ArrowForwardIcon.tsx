import React from 'react';

interface ArrowForwardIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowForwardIcon: React.FC<ArrowForwardIconProps> = ({ 
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
      
<path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"/>


    </svg>
  );
};

export default ArrowForwardIcon;
