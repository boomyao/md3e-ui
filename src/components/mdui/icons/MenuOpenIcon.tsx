import React from 'react';

interface MenuOpenIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuOpenIcon: React.FC<MenuOpenIconProps> = ({ 
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
      
<path d="M3 18V16H16V18H3ZM19.6 17L14.6 12L19.6 7L21 8.4L17.4 12L21 15.6L19.6 17ZM3 13V11H13V13H3ZM3 8V6H16V8H3Z"/>


    </svg>
  );
};

export default MenuOpenIcon;
