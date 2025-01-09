import React, { forwardRef, useId } from "react";

const Select = (
  {
    options = [],
    label,
    placeholder = "Select an option...",
    error,
    className = "",
    ...props
  },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full mb-4">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      {/* Select Dropdown */}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-900 w-full ${className}`}
      >
        {/* Placeholder */}
        {placeholder && <option value="">{placeholder}</option>}
        {/* Dynamic Options */}
        {options.map((option, index) =>
          typeof option === "object" ? (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ) : (
            <option key={index} value={option}>
              {option}
            </option>
          )
        )}
      </select>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default forwardRef(Select);
