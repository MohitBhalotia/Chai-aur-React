import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text",error, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full mb-4">
      {label && (
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
