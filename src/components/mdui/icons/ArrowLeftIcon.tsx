import React from 'react';

interface ArrowLeftIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ 
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
      
<path d="M14 17L9 12L14 7V17Z"/>


    </svg>
  );
};

export default ArrowLeftIcon;
