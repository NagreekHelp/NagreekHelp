

import { forwardRef } from "react";

const Input = forwardRef( 
  ({ label, placeholder, className = "", error, type = "text", exampleText, ...rest }, ref) => {
    return (
      <div className={`relative w-full`}>
        <div 
          className={`border border-gray-500 rounded-lg px-3 pt-2 pb-2 w-full relative ${
            error ? "ring-1 ring-semantic-red" : ""
          } focus-within:ring-1 focus-within:ring-neutral-600`}
        >
          <label className="absolute top-[-10px] left-3 bg-primary-white px-1 text-xs text-gray-600">
            {label}
          </label>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full text-gray-900 focus:ring-0 focus:outline-none bg-transparent ${className}`}
            {...rest}
          />
        </div>
        <p className={`text-xs mt-0.5 mx-2 ${error ? "text-semantic-red" : "text-gray-500"}`}>
          {error ? error : exampleText}
        </p>
      </div>
    );
  }
);

export default Input;