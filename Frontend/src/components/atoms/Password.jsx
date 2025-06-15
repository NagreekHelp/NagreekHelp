import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';


const PasswordInput = forwardRef(
  ({ label, placeholder, className = "", error, exampleText, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
      <div className="w-full">
        <div
          className={`relative border border-gray-500 rounded-lg px-3 pt-2 pb-2 w-full
            ${error ? "ring-1 ring-semantic-red" : ""}
            focus-within:ring-1 focus-within:ring-neutral-600`}
        >
          <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
            {label}
          </label>

          <input
            ref={ref}
            type="text" // always 'text', we handle masking manually
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              WebkitTextSecurity: showPassword ? 'none' : 'disc',
            } }
            
            className={`w-full pr-10 text-base outline-none border-none appearance-none ${className}`}
            {...rest}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className={`text-xs mt-0.5 mx-2 ${error ? "text-semantic-red" : "text-gray-500"}`}>
          {error ? error : exampleText}
        </p>
      </div>
    );
  }
);

export default PasswordInput;
