import React from "react";

const Logo = ({ width = "50px" }) => {
  return (
    <div className="flex gap-3 items-center justify-center">
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: width }}
        className="object-fill"
      />
      <p className="text-2xl font-bold">Logo</p>
    </div>
  );
};

export default Logo;
