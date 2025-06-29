import React from 'react';

interface MobileFriendlyIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const MobileFriendlyIcon: React.FC<MobileFriendlyIconProps> = ({ 
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
      
<path d="M6 23C5.45 23 4.97917 22.8042 4.5875 22.4125C4.19583 22.0208 4 21.55 4 21V3C4 2.45 4.19583 1.97917 4.5875 1.5875C4.97917 1.19583 5.45 1 6 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V7H16V6H6V18H16V17H18V21C18 21.55 17.8042 22.0208 17.4125 22.4125C17.0208 22.8042 16.55 23 16 23H6ZM6 20V21H16V20H6ZM14.95 16L10.7 11.75L12.1 10.35L14.95 13.2L20.6 7.55L22 8.95L14.95 16ZM6 4H16V3H6V4Z"/>


    </svg>
  );
};

export default MobileFriendlyIcon;
