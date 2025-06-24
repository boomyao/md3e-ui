import React from 'react';

interface SendIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const SendIcon: React.FC<SendIconProps> = ({ 
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
      
<path d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17ZM5 17V12V7V10.5V13.5V17Z"/>


    </svg>
  );
};

export default SendIcon;
