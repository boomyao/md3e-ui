import React from 'react';

interface CheckIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ 
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
      
<path d="M9.55001 18L3.85001 12.3L5.27501 10.875L9.55001 15.15L18.725 5.97501L20.15 7.40001L9.55001 18Z"/>


    </svg>
  );
};

export default CheckIcon;
