import React from 'react';

interface ArrowBackIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowBackIcon: React.FC<ArrowBackIconProps> = ({ 
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
      
<path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"/>


    </svg>
  );
};

export default ArrowBackIcon;
