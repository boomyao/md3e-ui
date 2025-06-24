import React from 'react';

interface NavigateBeforeIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const NavigateBeforeIcon: React.FC<NavigateBeforeIconProps> = ({ 
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
      
<path d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"/>


    </svg>
  );
};

export default NavigateBeforeIcon;
