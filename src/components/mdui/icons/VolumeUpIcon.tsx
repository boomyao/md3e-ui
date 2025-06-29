import React from 'react';

interface VolumeUpIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const VolumeUpIcon: React.FC<VolumeUpIconProps> = ({ 
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
      
<path d="M14 20.725V18.675C15.5 18.2416 16.7083 17.4083 17.625 16.175C18.5417 14.9416 19 13.5416 19 11.975C19 10.4083 18.5417 9.00831 17.625 7.77498C16.7083 6.54164 15.5 5.70831 14 5.27498V3.22498C16.0667 3.69164 17.75 4.73748 19.05 6.36248C20.35 7.98748 21 9.85831 21 11.975C21 14.0916 20.35 15.9625 19.05 17.5875C17.75 19.2125 16.0667 20.2583 14 20.725ZM3 15V8.99998H7L12 3.99998V20L7 15H3ZM14 16V7.94998C14.7833 8.31664 15.3958 8.86664 15.8375 9.59998C16.2792 10.3333 16.5 11.1333 16.5 12C16.5 12.85 16.2792 13.6375 15.8375 14.3625C15.3958 15.0875 14.7833 15.6333 14 16ZM10 8.84998L7.85 11H5V13H7.85L10 15.15V8.84998Z"/>


    </svg>
  );
};

export default VolumeUpIcon;
