import React from 'react';

interface PlayArrowIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const PlayArrowIcon: React.FC<PlayArrowIconProps> = ({ 
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
      
<path d="M8 19V5L19 12L8 19ZM10 15.35L15.25 12L10 8.65V15.35Z"/>


    </svg>
  );
};

export default PlayArrowIcon;
