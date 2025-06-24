import React from 'react';

interface CloseIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CloseIcon: React.FC<CloseIconProps> = ({ 
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
      
<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"/>


    </svg>
  );
};

export default CloseIcon;
