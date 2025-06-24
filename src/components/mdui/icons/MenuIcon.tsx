import React from 'react';

interface MenuIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ 
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
      
<path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"/>


    </svg>
  );
};

export default MenuIcon;
