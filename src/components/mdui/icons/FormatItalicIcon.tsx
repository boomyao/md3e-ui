import React from 'react';

interface FormatItalicIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const FormatItalicIcon: React.FC<FormatItalicIconProps> = ({ 
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
      
<path d="M5 19V16.5H9L12 7.5H8V5H18V7.5H14.5L11.5 16.5H15V19H5Z"/>


    </svg>
  );
};

export default FormatItalicIcon;
