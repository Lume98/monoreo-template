import React from "react";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className="flex items-center justify-center text-red-500"
      style={{ padding: "8px 16px", cursor: "pointer" }}
      {...props}
    >
      {label}
    </button>
  );
};
