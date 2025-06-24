import React from 'react';

interface VideocamOffIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const VideocamOffIcon: React.FC<VideocamOffIconProps> = ({ 
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
      
<path d="M22 17.5L18 13.5V15.175L6.82499 3.99999H16C16.55 3.99999 17.0208 4.19582 17.4125 4.58749C17.8042 4.97915 18 5.44999 18 5.99999V10.5L22 6.49999V17.5ZM20.55 23.35L0.649994 3.44999L2.04999 2.04999L21.95 21.95L20.55 23.35ZM3.99999 3.99999L18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H3.99999C3.44999 20 2.97916 19.8042 2.58749 19.4125C2.19583 19.0208 1.99999 18.55 1.99999 18V5.99999C1.99999 5.44999 2.19583 4.97915 2.58749 4.58749C2.97916 4.19582 3.44999 3.99999 3.99999 3.99999Z"/>


    </svg>
  );
};

export default VideocamOffIcon;
