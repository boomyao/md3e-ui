import React from 'react';

interface KeyboardReturnIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const KeyboardReturnIcon: React.FC<KeyboardReturnIconProps> = ({ 
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
      
<path d="M9 18L3 12L9 6L10.4 7.4L6.8 11H19V7H21V13H6.8L10.4 16.6L9 18Z"/>


    </svg>
  );
};

export default KeyboardReturnIcon;
