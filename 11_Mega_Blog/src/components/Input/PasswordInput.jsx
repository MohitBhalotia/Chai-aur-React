import { forwardRef, useState } from "react";
import { Input } from "../index";

const PasswordInput = ({ label, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        type={showPassword ? "text" : "password"}
        {...props}
        className="w-full border rounded-lg px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
        error={error}
        ref={ref}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute top-1/2 text-xl right-4 text-blue-600 hover:underline focus:outline-none"
      >
        {showPassword ? "🔓" : "🔒"}
      </button>
    </div>
  );
};

export default forwardRef(PasswordInput);
