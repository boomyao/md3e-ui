import React from 'react';

interface AddIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const AddIcon: React.FC<AddIconProps> = ({ 
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
      
<path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"/>


    </svg>
  );
};

export default AddIcon;
