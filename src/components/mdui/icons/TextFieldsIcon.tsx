import React from 'react';

interface TextFieldsIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const TextFieldsIcon: React.FC<TextFieldsIconProps> = ({ 
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
      
<path d="M7 20V7H2V4H15V7H10V20H7ZM16 20V12H13V9H22V12H19V20H16Z"/>


    </svg>
  );
};

export default TextFieldsIcon;
