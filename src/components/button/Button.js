import React from "react";
const Button = ({
  onClick,
  className,
  children,
  full = false,
  type = "button",
  bgColor = "primaryy",
}) => {
  let bgClassName = { bgColor };
  switch (bgColor) {
    case "primaryy":
      bgClassName = "bg-primaryy";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`py-3 px-6 ${bgClassName} rounded-lg capitalize ${full}? 'w-full':'' mt-auto ${className}`}
      onClick={onClick} // dùng dể điều hướng các trang nhờ Router url
    >
      {children}
    </button>
  );
};

export default Button;
