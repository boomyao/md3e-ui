import React from 'react';

interface DirectionsWalkIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const DirectionsWalkIcon: React.FC<DirectionsWalkIconProps> = ({ 
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
      
<path d="M7 23L9.8 8.9L8 9.6V13H6V8.3L11.05 6.15C11.2833 6.05 11.5292 5.99167 11.7875 5.975C12.0458 5.95833 12.2917 5.99167 12.525 6.075C12.7583 6.15833 12.9792 6.275 13.1875 6.425C13.3958 6.575 13.5667 6.76667 13.7 7L14.7 8.6C15.1333 9.3 15.7208 9.875 16.4625 10.325C17.2042 10.775 18.05 11 19 11V13C17.8333 13 16.7917 12.7583 15.875 12.275C14.9583 11.7917 14.175 11.175 13.525 10.425L12.9 13.5L15 15.5V23H13V16.5L10.9 14.9L9.1 23H7ZM13.5 5.5C12.95 5.5 12.4792 5.30417 12.0875 4.9125C11.6958 4.52083 11.5 4.05 11.5 3.5C11.5 2.95 11.6958 2.47917 12.0875 2.0875C12.4792 1.69583 12.95 1.5 13.5 1.5C14.05 1.5 14.5208 1.69583 14.9125 2.0875C15.3042 2.47917 15.5 2.95 15.5 3.5C15.5 4.05 15.3042 4.52083 14.9125 4.9125C14.5208 5.30417 14.05 5.5 13.5 5.5Z"/>


    </svg>
  );
};

export default DirectionsWalkIcon;
