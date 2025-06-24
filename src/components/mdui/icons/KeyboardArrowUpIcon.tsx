import React from 'react';

interface KeyboardArrowUpIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const KeyboardArrowUpIcon: React.FC<KeyboardArrowUpIconProps> = ({ 
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
      
<path d="M12 10.8L7.4 15.4L6 14L12 8L18 14L16.6 15.4L12 10.8Z"/>


    </svg>
  );
};

export default KeyboardArrowUpIcon;
