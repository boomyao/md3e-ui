import React from 'react';

interface PlayArrowFilledIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const PlayArrowFilledIcon: React.FC<PlayArrowFilledIconProps> = ({ 
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
      
<path d="M8 19V5L19 12L8 19Z"/>


    </svg>
  );
};

export default PlayArrowFilledIcon;
