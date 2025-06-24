import React from 'react';

interface CheckIndeterminateSmallIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CheckIndeterminateSmallIcon: React.FC<CheckIndeterminateSmallIconProps> = ({ 
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
      
<path d="M6 13V11H18V13H6Z"/>


    </svg>
  );
};

export default CheckIndeterminateSmallIcon;
