import React from 'react';

interface GifIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const GifIcon: React.FC<GifIconProps> = ({ 
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
      
<path d="M11.1429 7H13.7143V17.2857H11.1429V7ZM6.85714 7H1.71429C0.685714 7 0 7.85714 0 8.71429V15.5714C0 16.4286 0.685714 17.2857 1.71429 17.2857H6.85714C7.88571 17.2857 8.57143 16.4286 8.57143 15.5714V12.1429H6V14.7143H2.57143V9.57143H8.57143V8.71429C8.57143 7.85714 7.88571 7 6.85714 7ZM24 9.57143V7H16.2857V17.2857H18.8571V13.8571H22.2857V11.2857H18.8571V9.57143H24Z"/>


    </svg>
  );
};

export default GifIcon;
