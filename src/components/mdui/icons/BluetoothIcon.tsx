import React from 'react';

interface BluetoothIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const BluetoothIcon: React.FC<BluetoothIconProps> = ({ 
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
      
<path d="M11 22V14.4L6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L11 9.6V2H12L17.7 7.7L13.4 12L17.7 16.3L12 22H11ZM13 9.6L14.9 7.7L13 5.85V9.6ZM13 18.15L14.9 16.3L13 14.4V18.15Z"/>


    </svg>
  );
};

export default BluetoothIcon;
