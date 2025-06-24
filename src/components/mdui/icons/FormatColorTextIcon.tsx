import React from 'react';

interface FormatColorTextIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FormatColorTextIcon: React.FC<FormatColorTextIconProps> = ({ 
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
      
<path d="M2 24V20H22V24H2ZM5.5 17L10.75 3H13.25L18.5 17H16.1L14.85 13.4H9.2L7.9 17H5.5ZM9.9 11.4H14.1L12.05 5.6H11.95L9.9 11.4Z"/>


    </svg>
  );
};

export default FormatColorTextIcon;
