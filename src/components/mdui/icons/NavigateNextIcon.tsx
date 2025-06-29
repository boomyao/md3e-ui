import React from 'react';

interface NavigateNextIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const NavigateNextIcon: React.FC<NavigateNextIconProps> = ({ 
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
      
<path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"/>


    </svg>
  );
};

export default NavigateNextIcon;
