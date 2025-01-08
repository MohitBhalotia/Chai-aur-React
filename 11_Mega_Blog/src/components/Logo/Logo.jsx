import React from "react";

const Logo = ({ width = "50px" }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: width }}
        className="object-fill"
      />
    </div>
  );
};

export default Logo;
