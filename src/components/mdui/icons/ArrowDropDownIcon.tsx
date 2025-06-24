import React from 'react';

interface ArrowDropDownIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowDropDownIcon: React.FC<ArrowDropDownIconProps> = ({ 
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
      
<path d="M12 15L7 10H17L12 15Z"/>


    </svg>
  );
};

export default ArrowDropDownIcon;
