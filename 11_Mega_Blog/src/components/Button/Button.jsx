import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverColor = "hover:bg-blue-600",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 text-sm font-medium rounded-md shadow-md transition duration-300 ease-in-out ${bgColor} ${textColor} ${hoverColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
