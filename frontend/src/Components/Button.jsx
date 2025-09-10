import React from "react";

const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden px-6 py-2 rounded-full font-medium shadow
        bg-black text-white
        transition-all duration-500
        ${className}
      `}
    >
      {/* Left to Right Hover BG */}
      <span
        className="absolute inset-0 w-0 bg-white transition-all duration-500 group-hover:w-full"
        style={{ zIndex: 1 }}
      ></span>

      {/* Button Text */}
      <span className="relative z-10 group-hover:text-black">{children}</span>
    </button>
  );
};

export default Button;
