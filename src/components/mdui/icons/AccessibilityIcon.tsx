import React from 'react';

interface AccessibilityIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const AccessibilityIcon: React.FC<AccessibilityIconProps> = ({ 
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
      
<path d="M12 6C11.45 6 10.9792 5.80417 10.5875 5.4125C10.1958 5.02083 10 4.55 10 4C10 3.45 10.1958 2.97917 10.5875 2.5875C10.9792 2.19583 11.45 2 12 2C12.55 2 13.0208 2.19583 13.4125 2.5875C13.8042 2.97917 14 3.45 14 4C14 4.55 13.8042 5.02083 13.4125 5.4125C13.0208 5.80417 12.55 6 12 6ZM9 22V9H3V7H21V9H15V22H13V16H11V22H9Z"/>


    </svg>
  );
};

export default AccessibilityIcon;
