import React from 'react';

interface KeyboardArrowDownIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const KeyboardArrowDownIcon: React.FC<KeyboardArrowDownIconProps> = ({ 
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
      
<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"/>


    </svg>
  );
};

export default KeyboardArrowDownIcon;
