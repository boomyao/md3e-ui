import React from 'react';

interface ReplyIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const ReplyIcon: React.FC<ReplyIconProps> = ({ 
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
      
<path d="M19 19V15C19 14.1667 18.7083 13.4583 18.125 12.875C17.5417 12.2917 16.8333 12 16 12H6.825L10.425 15.6L9 17L3 11L9 5L10.425 6.4L6.825 10H16C17.3833 10 18.5625 10.4875 19.5375 11.4625C20.5125 12.4375 21 13.6167 21 15V19H19Z"/>


    </svg>
  );
};

export default ReplyIcon;
